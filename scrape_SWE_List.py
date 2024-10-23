from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager  # Import webdriver-manager
from selenium.webdriver.chrome.service import Service
import time

# Initialize WebDriver without specifying the path to chromedriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Open a website
driver.get("https://github.com/SimplifyJobs/Summer2025-Internships")

# Wait for the page to load
time.sleep(2)

# Locate the search bar using its name attribute and search for something
first_element = driver.find_element(By.XPATH, "//markdown-accessiblity-table/table/tbody/tr[2]/td/strong")
print(first_element.text)
# search_box.send_keys("Selenium WebDriver")
# search_box.send_keys(Keys.RETURN)


# Close the browser
driver.quit()
