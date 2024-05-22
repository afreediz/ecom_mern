import requests
from faker import Faker

# Initialize Faker
fake = Faker()

# API endpoint for user registration
REGISTER_URL = 'http://localhost:3002/api/auth/register'

# Function to register a new user
def register_user(name, email, password, address, phone):
    data = {
        'name': name,
        'email': email,
        'password': password,
        'address': address,
        'phone': phone
    }
    response = requests.post(REGISTER_URL, json=data)
    return response.json()

# Generate sample data for user registration
def generate_fake_users(n):
    users = []
    for _ in range(n):
        name = fake.name()
        email = fake.email()
        password = fake.password()
        address = fake.address()
        phone = fake.phone_number()
        users.append({'name': name, 'email': email, 'password': password, 'address': address, 'phone': phone})
    return users

# Generate 10 fake users
fake_users = generate_fake_users(1)

# Register users
for user_data in fake_users:
    user = register_user(**user_data)
    print(f'User {user_data["name"]} registered successfully: {user}')

print('Finished registering users.')
