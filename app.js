// Global Değişkenler
const buttons = document.querySelector(".buttons");
const result = document.querySelector(".result");
const eq = document.querySelector(".eq");

eventListeners();

function eventListeners() {
    buttons.addEventListener("click", write);
    eq.addEventListener("click", calculate);
}


// Tıklanan buttonları text areaya yaz
function write(e) {
    e.preventDefault();

    if (e.target.getAttribute("class") == "number" || e.target.getAttribute("class") == "op") {
        result.value += e.target.value;
    }
}


function calculate() {
    // Input areadaki texti alır
    var inputString = result.value;

    // Stringdeki sayıları numbers dizisine alır
    var numbers = inputString.split(/\+|\-|\*|\//g);

    // Sayıları ve noktaları boş eleman ("") olarak değiştir sonra boş elemana göre ayır ve kalanları operatör dizisine al
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    // Döngüler
    // Bölme => Çarpma => Çıkarma => Toplama
    // İşlemleri number dizisi üzerinde yapyoruz
    // Sona kalan eleman sonuç olacak

    // "/" işaretini bul sağındaki sayıyı solundaki sayıya böl , sağdaki sayının üzerine yaz soldaki sayıyı sil
    var divide = operators.indexOf("/");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("/");
    }

    // "*" işaretini bul sağındaki sayıyı solundaki sayıyla çarp , sağdaki sayının üzerine yaz soldaki sayıyı sil
    var multiply = operators.indexOf("*");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("*");
    }

    // "-" işaretini bul sağındaki sayıyı solundaki sayıdan çıkar , sağdaki sayının üzerine yaz soldaki sayıyı sil
    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    // "+" işaretini bul sağındaki sayıyı solundaki sayıyla topla , sağdaki sayının üzerine yaz soldaki sayıyı sil
    var add = operators.indexOf("+");
    while (add != -1) {
        // Stringi sayıya çevirmek gerekiyor yoksa stringleri birleştirir
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    // Son eleman, yan sonuç
    result.value = numbers[0];
}