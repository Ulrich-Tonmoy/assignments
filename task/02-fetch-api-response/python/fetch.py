import requests

headers = {
    'Authorization': 'Token: d7c01847de4c083cb154e9a533294301e9f05f93dbae7d589e42ece63226c0a3',
    'Content-Type': 'application/json',
}
response = requests.request(
    "GET", "https://gorest.co.in/public/v1/users", headers=headers)

print(response.json())
