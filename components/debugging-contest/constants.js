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

export const BUGGY_C_CODE = `
#include <stdio.h>
#include <string.h>

/* The correct flag is: FLAG{DeBuGgInG_Is_FuN} */
int main() {
    char part1[] = "FLAG{";
    char part2[] = "DeBuGgInG";
    char part3[] = "_Is_";
    char part4[] = "FuN";
    char part5[] = "}";
    char flag[64];

    /* Bug: wrong concatenation order */
    sprintf(flag, "%s%s%s%s%s", part1, part2, part4, part3, part5);

    printf("%s\\n", flag);
    return 0;
}
`;
