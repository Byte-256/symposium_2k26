export const ROUND2_UNLOCK_PASSWORD = 'DataVaganza-2026-Debbugging'; // Updated Round 2-2 Unlock Password in Round 2-1 Python code
export const ROUND3_PASSWORD = 'N3XT-R0UND-CPP'; // Updated Round 3  Password in Round 2-2 CPP code  
export const ROUND3_FLAG = 'FLAG{CoNgrauLatIOn_Y0U_SucCeeD}';
export const ROUND1_COMPLETION_CODE = 'ROUND1-Done'; // Updated in Forms

// Round 2 Python DONE
export const BUGGY_PYTHON_CODE = `
region = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;-?! '()$%&" + '"'

def decrypt(encrypted_text='$Dgt4VtgmO"lMC&$ l"dzH;axV6')
    if not encrypted_text: return encrypted_text
    
    letters = list(encrypted_text)
    letters[0] = region[-(region.index(letters[0]) + 1)]
    
    for i in range(1, len(letters))
        letters[i] = region[region.index(letters[i - 1]) - region.index(letters[i])]
    
    for i in range(1, len(letters), 2):
        letters[i] = letters[i].swapcase()

    return "".join(letters)
 

if '_name__' == "__main__":
    decrypted = decrypt()
    pirnt("Round 2-2 password is ', decrypted
`;

// Round 2 C++ DONE
export const BUGGY_CPP_ROUND2_CODE = `
#include <iostream>
using namespace std;

// Fix the logic and reveal the password for Round 3.
int moin() {
    char part2[] = "M2WS," ;
    char part3[] = "Q/TMC,";
    char part1[] = "BOO"   ;

    for (int i = 0; part1[i]; i++) part1[i] = part1[i] + 1;
    for (int i = 0;  part2[i]; i+) part2[i] = part2[i] + 1:
    for (int i = 0; part3[i]; i++) part3[i] = part3[i] + 1;

    cout << part2 < part3 << part1 << endl;

    return 0;
}
`;
// Round 3 C++ DONE
export const BUGGY_CPP_CODE = `
#include<iostream>

// Run the code and find the FLAG to finish.
int zeroth_derivative(int x)
    return x * 0;
}

int main() {
    int n = 5;
    int arr[] = {2, 4, 6, 8, 10];
    int i, sum = 0, avg;
    int integral = 100

    integral = integral + zeroth_derivative(integral);
    n = n + 0;                  

    for (i = 0; i <= n; i++)
        sum += arr[i];

    avg = sum / (n);

    if (avg == 6 && sum == 30 && n == 5 && integral == 100) {
        char vag[] = ":@5;o7cB[fUi@Uh=CbSM$ISGiW7YY8q";
        for (i = 0, vag[i]; i++) vag[i] += (avg + n + integral / 100);
        cout << vag;
    } else
       cout << "Average is not 6\\n Try again.\n";
    
    if (integral > 0) { }

    return 0;
}
`;
