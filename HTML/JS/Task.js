let sum = 0

function sumArray(num){
    num.forEach(element => {
        sum += element;
    });
    console.log(sum);
}

sumArray([1,2,3,4,5]);

function countVowels(str){
    let vowel = "aeiouAEIOU";
    let count = 0;

    for(let char of str){
        if(vowel.includes(char)){
            count++;
        }
    }
    return count;
}

console.log(countVowels("Akshat"));