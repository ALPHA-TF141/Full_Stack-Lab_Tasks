def greet(name: str) -> str:
    return f"Hello, {name}!"


def add(a: int, b: int) -> int:
    return a + b


def show_menu() -> None:
    print("Sample Project")
    print("1. Greet user")
    print("2. Add two numbers")


if __name__ == "__main__":
    show_menu()
    print(greet("Git User"))
    print(f"2 + 3 = {add(2, 3)}")
