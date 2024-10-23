from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from datetime import datetime
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.maximize_window()

driver.get("https://github.com/SimplifyJobs/Summer2025-Internships")

time.sleep(3)

current_date = datetime.now().strftime("%b %d")
i = 1
visited = False

companies = []
roles = []
locations = []
application_links = []

total_companies = len(driver.find_elements(By.XPATH, "//markdown-accessiblity-table/table/tbody/tr"))

while i<=total_companies:
    date_posted = driver.find_element(By.XPATH, "//markdown-accessiblity-table/table/tbody/tr[" + str(i) + "]/td[5]").text
    if date_posted == current_date:
        company = driver.find_element(By.XPATH, "//markdown-accessiblity-table/table/tbody/tr[" + str(i) + "]/td/strong").text
        role = driver.find_element(By.XPATH, "//markdown-accessiblity-table/table/tbody/tr[" + str(i) + "]/td[2]").text
        location = driver.find_element(By.XPATH, "//markdown-accessiblity-table/table/tbody/tr[" + str(i) + "]/td[3]").text
        application_link = driver.find_element(By.XPATH, "//markdown-accessiblity-table/table/tbody/tr[" + str(i) + "]/td[4]/a").get_attribute("href")
        companies.append(company)
        roles.append(role)
        locations.append(location)
        application_links.append(application_link)
        visited = True
    elif visited:
        break
    i += 1

driver.quit()

print(companies)
print(roles)
print(locations)
print(application_links)
