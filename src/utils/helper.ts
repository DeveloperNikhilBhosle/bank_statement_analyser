


  export class Helpers{

     static checkIfStringContainsSubstrings(mainString: string, substrings: string[]): boolean {
        // console.log(mainString,'mainString');
        // console.log(substrings,'substrings');

        return substrings.some(substring => mainString.includes(substring));
      }

      static findMatchingElements(arr1: string[], arr2: string[]): boolean {
        // Convert one array to a Set for faster lookup
        const set2 = new Set(arr2);
    
        // Check if any element in arr1 exists in set2
        for (let element of arr1) {
          if (set2.has(element)) {
            return true; // Found a match
          }
        }
    
        return false; // No matching elements found
      }

  }