import pytest
import requests
from scrape_SWE_List import fetch_swe_list
from unittest.mock import patch, Mock

def test_github_request_status():
    url = "https://github.com/SimplifyJobs/Summer2025-Internships"
    response = requests.get(url)
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"

def test_fetch_swe_list_returns_list():
    result = fetch_swe_list()
    assert len(result) == 4, "fetch_swe_list should return exactly 4 lists"
    for i, sublist in enumerate(result):
        assert isinstance(sublist, list), f"Sublist {i} should be a list"

@patch('requests.get')
def test_fetch_swe_list_handles_network_error(mock_get):
    mock_get.side_effect = requests.exceptions.RequestException("Network error")
    with pytest.raises((requests.exceptions.RequestException, Exception)) as exc_info:
        fetch_swe_list()
    assert "Network error" in str(exc_info.value)

@pytest.mark.parametrize("invalid_url", [
    "https://nonexistent.example.com",
    "not_a_url",
    ""
])
@patch('requests.get')
def test_fetch_swe_list_with_invalid_urls(mock_get, invalid_url):
    mock_response = Mock()
    mock_response.status_code = 404
    mock_get.return_value = mock_response
    mock_get.side_effect = requests.exceptions.RequestException(f"Failed to fetch from {invalid_url}")
    
    with pytest.raises((requests.exceptions.RequestException, Exception)) as exc_info:
        fetch_swe_list()
    assert any(msg in str(exc_info.value).lower() for msg in ['failed', 'error'])

@pytest.fixture
def client():
    from scrape_SWE_List import app
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_swe_lists_route_success(client):
    response = client.get('/swe-lists')
    assert response.status_code == 200
    data = response.get_json()
    expected_keys = ["companies", "roles", "locations", "application_links"]
    assert all(key in data for key in expected_keys), "Response missing required keys"
    for key in expected_keys:
        assert isinstance(data[key], list), f"{key} should be a list"
        assert len(data[key]) == len(data["companies"]), f"{key} list length mismatch"

@patch('scrape_SWE_List.fetch_swe_list')
def test_swe_lists_route_empty(mock_fetch, client):
    mock_fetch.return_value = ([], [], [], [])
    response = client.get('/swe-lists')
    assert response.status_code == 200
    data = response.get_json()
    assert all(len(data[key]) == 0 for key in data), "All lists should be empty"

@patch('scrape_SWE_List.fetch_swe_list')
def test_swe_lists_route_error(mock_fetch, client):
    mock_fetch.side_effect = Exception("Test error")
    response = client.get('/swe-lists')
    assert response.status_code == 500 

def test_swe_lists_wrong_method(client):
    response = client.post('/swe-lists')
    assert response.status_code == 405 