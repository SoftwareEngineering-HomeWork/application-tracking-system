

import requests
from lxml import html
from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def fetch_github_jobs():
    """
    Scrapes job listings from multiple GitHub repositories related to internships and jobs.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    # GitHub repositories for job listings
    github_links = [
        "https://github.com/SimplifyJobs/Summer2025-Internships",
        "https://github.com/SimplifyJobs/Summer2024-Internships",
        "https://github.com/SimplifyJobs/New-Grad-Positions",
        "https://github.com/SimplifyJobs/2024-New-Grad-Tech-Jobs",
        "https://github.com/cvrve/Summer2025-Internships",
        "https://github.com/firstcontributions/first-contributions"
    ]
    
    # Combined results
    companies = []
    roles = []
    locations = []
    application_links = []

    for url in github_links:
        try:
            print(f"Scraping {url}...")
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Check if request was successful
            tree = html.fromstring(response.content)
            listings = tree.xpath('//markdown-accessiblity-table/table/tbody/tr')

            current_date = datetime.now().strftime("%b %d")
            latest_company = ""

            for i, listing in enumerate(listings, start=1):
                try:
                    # Extract details using XPath
                    date_posted = tree.xpath(f'//markdown-accessiblity-table/table/tbody/tr[{i}]/td[5]')[0].text_content().strip()
                    if date_posted == current_date:
                        company = tree.xpath(f'//markdown-accessiblity-table/table/tbody/tr[{i}]/td[1]')[0].text_content().strip()
                        role = tree.xpath(f'//markdown-accessiblity-table/table/tbody/tr[{i}]/td[2]')[0].text_content().strip()
                        location = tree.xpath(f'//markdown-accessiblity-table/table/tbody/tr[{i}]/td[3]')[0].text_content().strip()
                        application_link = tree.xpath(f'//markdown-accessiblity-table/table/tbody/tr[{i}]/td[4]/a/@href')[0]

                        # Handle ↳ for multiple roles in the same company
                        if company != "↳":
                            latest_company = company
                        else:
                            company = latest_company

                        companies.append(company)
                        roles.append(role)
                        locations.append(location)
                        application_links.append(application_link)
                except Exception as e:
                    print(f"Error parsing row {i} from {url}: {e}")
        except Exception as e:
            print(f"Error scraping {url}: {e}")

    return companies, roles, locations, application_links

@app.route('/swe-lists', methods=['GET'])
def get_swe_lists():
    """
    API endpoint to return scraped job listings.
    """
    try:
        companies, roles, locations, application_links = fetch_github_jobs()
        return jsonify({
            "companies": companies,
            "roles": roles,
            "locations": locations,
            "application_links": application_links
        }), 200
    except Exception as e:
        # Log the error and return a meaningful response
        print(f"Error in /swe-lists endpoint: {e}")
        return jsonify({"error": "Failed to fetch job listings."}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002, debug=True)
