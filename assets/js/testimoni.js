const dataDummy = [
    {
    name : "Nobita",
    rating : 2,
    comment : "Jika aku lemah, tidak mungkin aku bisa bertahan sampai saat ini",
    image : "https://www.buddytv.com/wp-content/uploads/2022/05/the-patrick-star-show-spongebob-squarepants.jpg"
    },
    {
    name : "Doraemon",
    rating : 5,
    comment : "Jangan menengok ke masa lalu terus, lebih baik belajar dari sekarang untuk masa depanmu",
    image : "https://cdn.idntimes.com/content-images/community/2022/06/image-44d2f5caa18cacda0fd35d98f554c21e.jpg"
    },
    {
    name : "Giant",
    rating : 3,
    comment : "Mana bisa aku diam saja jika ada teman yang butuh pertolongan",
    image : "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/800px-Mr._Krabs.svg.png"
    },
    {
    name : "Shizuka",
    rating : 4,
    comment : "Jangan khawatir, aku selalu ada untukmu",
    image : "https://cdn.idntimes.com/content-images/community/2018/09/35c300533a698a7516a62f677879540f_600x400.jpg"
    },
    {
    name : "Suneo",
    rating : 3,
    comment : "Di dunia ini yang penting adalah uang",
    image : "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/02/27/Snapinstaapp_1080_332750966_200-1013192027.jpg"
    }
]

function showAll() {
    let testHtml = '';

    dataDummy.forEach((element) => {
        testHtml += `            
        <div class="card-project">
            <div class="content">
                <img src=${element.image} alt="image">
                <div class="text">
                    <p>'${element.comment}'</p>
                </div>
                <span><p>~ ${element.name}</p></span>
                <span><p><i class="fa fa-star"></i> ${element.rating}</p></span>
            </div>
        </div>`
    });

    document.getElementById('testi').innerHTML = testHtml;
}
showAll()

function dataFiltered(rating) {
    let testHtml = ''
    
    const filterData = dataDummy.filter(function(data){
        return data.rating === rating});
        console.log(filterData); 

    if (filterData.length === 0) {
        testHtml = `<div class="card-project">
            <div class="content">
                <img src="data:image/png;base64,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" alt="image">
                <div class="text">
                <h3>Data not Found!</h3>
                </div>
                <span><p></p></span>
                <span><p></p></span>
            </div>
        </div>`
    } else {
        filterData.forEach((data) => {
            testHtml += `
            <div class="card-project">
            <div class="content">
                <img src=${data.image} alt="image">
                <div class="text">
                    <p>'${data.comment}'</p>
                </div>
                <span><p>~ ${data.name}</p></span>
                <span><p><i class="fa fa-star"></i> ${data.rating}</p></span>
            </div>
        </div>`
        });
    }

    document.getElementById('testi').innerHTML = testHtml;
}