import random
import string

def generate_password(length, use_uppercase=True, use_lowercase=True, use_numbers=True, use_symbols=True):
    # Character set definitions
    uppercase_chars = string.ascii_uppercase
    lowercase_chars = string.ascii_lowercase
    number_chars = string.digits
    symbol_chars = '!@#$%^&*()_-+=<>?/[]{}|'
    
    # Creating character pool based on chosen options
    chars = ""
    if use_uppercase:
        chars += uppercase_chars
    if use_lowercase:
        chars += lowercase_chars
    if use_numbers:
        chars += number_chars
    if use_symbols:
        chars += symbol_chars
    
    # If no option is selected, use uppercase by default
    if not chars:
        print("No character type selected. Using uppercase letters by default.")
        chars = uppercase_chars
    
    # Password generation
    password = ''.join(random.choice(chars) for _ in range(length))
    return password

def get_yes_no_input(prompt):
    while True:
        response = input(f"{prompt} (y/n, default: y): ").lower().strip()
        if response == "" or response in ['y', 'yes']:
            return True
        elif response in ['n', 'no']:
            return False
        else:
            print("Please answer with 'y' or 'n'.")

def main():
    print("\n===== PASSWORD GENERATOR =====\n")
    
    # Ask for password length
    while True:
        try:
            length_input = input("Password length (4-50): ")
            length = int(length_input)
            if 4 <= length <= 50:
                break
            else:
                print("Length must be between 4 and 50 characters.")
        except ValueError:
            print("Please enter a valid number.")
    
    # Configuration options
    print("\n--- Options ---")
    use_uppercase = get_yes_no_input("Include uppercase letters")
    use_lowercase = get_yes_no_input("Include lowercase letters")
    use_numbers = get_yes_no_input("Include numbers")
    use_symbols = get_yes_no_input("Include symbols")
    
    # Password generation
    password = generate_password(length, use_uppercase, use_lowercase, use_numbers, use_symbols)
    
    # Display result
    print("\n--- Generated Password ---")
    print(f"\n{password}\n")
    
    # Option to generate a new password
    while get_yes_no_input("Do you want to generate a new password"):
        password = generate_password(length, use_uppercase, use_lowercase, use_numbers, use_symbols)
        print(f"\nNew password: {password}\n")

if __name__ == "__main__":
    main()