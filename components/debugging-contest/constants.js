export const ROUND_PASSWORD = 'SuperSecretPassword123';
export const ROUND3_FLAG = 'FLAG{DeBuGgInG_Is_FuN}';

export const BUGGY_PYTHON_CODE = `
import sys

# This function is supposed to concatenate two strings
# but it has a bug. Find it and fix it.
def concatenate_strings(a, b):
  return a + b

def main():
  # The password is "SuperSecretPassword123"
  # Don't just print the password, fix the code to reveal it.
  part1 = "SuperSecret"
  part2 = "Password123"
  
  # There's a logical error in how the parts are combined.
  result = concatenate_strings(part2, part1) # Oh, this looks wrong
  
  # And another small issue here...
  prnt("The password is:", result)

if __name__ == "__main__":
  main()
`;

export const BUGGY_CPP_CODE = `
#include <iostream>
#include <string>
#include <vector>

// The flag is hidden, you need to fix the logic to print it.
// The correct flag is "FLAG{DeBuGgInG_Is_FuN}"
void print_flag() {
    std::string part1 = "FLAG{";
    std::string part2 = "DeBuGgInG";
    std::string part3 = "_Is_";
    std::string part4 = "FuN";
    std::string part5 = "}";

    // There is a bug in the following line.
    std::cout << part1 << part2 << part4 << part3 << part5 << std::endl;
}

int main() {
    print_flag();
    return 0;
}
`;
