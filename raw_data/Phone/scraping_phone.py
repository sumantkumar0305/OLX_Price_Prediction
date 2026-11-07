import time
import pandas as pd

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


# =========================================================
# 1. Selenium Setup
# =========================================================

options = Options()
options.add_argument("--start-maximized")

driver = webdriver.Chrome(options=options)
wait = WebDriverWait(driver, 15)


# =========================================================
# 2. Variables
# =========================================================

base_url = "https://www.olx.in/en-in/mobile-phones_c1453?page={}"

not_include = [7, 12, 24, 36]

scraped_data = []


# =========================================================
# 3. Scrape 50 Pages
# =========================================================


for page in range(1, 63):
	print(page)
	# Create page URL
	page_url = base_url.format(page)
	
	driver.get(page_url)
	
	# Give page some time to load
	time.sleep(3)
	
	
	# =====================================================
	# 4. Extract Listing URLs from Current Page
	# =====================================================
	
	urls = []
	
	for i in range(1, 45):
	
		if i not in not_include:
	
			path = (
				f'//*[@id="main_content"]/div/div/section/div/div/'
				f'div[5]/div[2]/div[1]/div[2]/ul/li[{i}]/a'
			)
	
			try:
	
				element = wait.until(
					EC.presence_of_element_located(
						(By.XPATH, path)
					)
				)
	
				url = element.get_attribute("href")
	
				if url:
					urls.append(url)
	
			except Exception:
				continue
	
	
	
	# =====================================================
	# 5. Scrape Each Listing
	# =====================================================
	sum = 0
	for url in urls:
		print(sum)
		sum = sum+1;
		try:
			driver.get(url)
	
	
			# -------------------------------------------------
			# Title
			# -------------------------------------------------
	
			try:
	
				title = wait.until(
					EC.presence_of_element_located(
						(
							By.XPATH,
							'//*[@id="main_content"]/div/div[2]/div/div[4]/div[1]/div/section/h1'
						)
					)
				).text
	
			except Exception:
				title = None
	
	
			# -------------------------------------------------
			# Price
			# -------------------------------------------------
	
			try:
	
				price = wait.until(
					EC.presence_of_element_located(
						(
							By.XPATH,
							'//*[@id="main_content"]/div/div[2]/div/div[4]/div[1]/div/section/span'
						)
					)
				).text
	
			except Exception:
	
				price = None
	
	
			# -------------------------------------------------
			# Brand
			# -------------------------------------------------
	
			try:
	
				brand = wait.until(
					EC.presence_of_element_located(
						(
							By.XPATH,
							'//*[@id="main_content"]/div/div[2]/div/div[3]/section/div/div/div[2]/div/div/div/span[2]'
						)
					)
				).text
	
			except Exception:
	
				brand = None
	
	
			# -------------------------------------------------
			# Description
			# -------------------------------------------------
	
			try:
	
				description = wait.until(
					EC.presence_of_element_located(
						(
							By.XPATH,
							'//*[@id="main_content"]/div/div[2]/div/div[3]/section/div/div/div[3]'
						)
					)
				).text
	
			except Exception:
	
				description = None
	
	
			# -------------------------------------------------
			# Store Data
			# -------------------------------------------------
	
			scraped_data.append(
				{
					"Title": title,
					"Price": price,
					"Brand": brand,
					"Description": description,
					"URL": url
				}
			)
	
	
		except Exception as e:
	
			print("Error:", e)
	
			continue

# =========================================================
# 6. Convert Data to DataFrame
# =========================================================

df = pd.DataFrame(scraped_data)


# =========================================================
# 7. Save Data
# =========================================================

df.to_csv(
    "olx_mobile_sixtyone_sixtytwo.csv",
    index=False
)

driver.quit()