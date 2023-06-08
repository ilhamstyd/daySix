//deklarasi variabel sebagai array kosong yang akan menyimpan object dataProject
let blogs = [];

// Fungsi getProject akan dipanggil ketika formulir disubmit.
function getProject(e) {
  e.preventDefault();

  // mengambil nilai dari elemen input pada halaman HTML
  let projectName = document.getElementById("projectName").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let desc = document.getElementById("desc").value;
  let image = document.getElementById("upload-image").files;

  // Checkboxes
  let technologies = getSelectedTechnologies().join("");

  // Validation
  if (projectName === "") {
    return alert("Tolong isi bagian nama projek anda");
  } else if (startDate === "") {
    return alert("Tolong masukkan tanggal yang sesuai");
  } else if (endDate === "") {
    return alert("Tolong masukkan tanggal yang sesuai");
  } else if (desc === "") {
    return alert("Tolong masukkan deskripsi dengan benar");
  } else {
    alert("Segera ditampilkan");
  }

  // Convert image to URL
  image = URL.createObjectURL(image[0]);

  //konversi dari string menjadi objek date buat perhitungan jarak waktu
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  // menghitung selisih waktu
  const distance = endDate.getTime() - startDate.getTime();

  // Calculate duration
  let durasi = calculateDuration(distance);

  //menyimpan objek dengan properti yang berisi data project ditampung sebelumnya.
  let dataProject = {
    image,
    projectName,
    startDate,
    endDate,
    durasi,
    desc,
    author: "Ilham Setyadji",
    postAt: new Date(),
    technologies,
  };

//menambah ke dalam array blogs menggunakan metode push().
  blogs.push(dataProject);
  console.log(blogs)

  clear();
  showProjects();
}

//menghitung durasi proyek berdasarkan selisih waktu yang diberikan.
//Ini mengonversi selisih waktu dalam milidetik menjadi jumlah bulan dan hari. 
function calculateDuration(distance) {
    const timeUnits = [
        { unit: "years", divisor: 12 * 30 * 7 * 24 * 60 * 60 * 1000 },
        { unit: "months", divisor: 30 * 24 * 60 * 60 * 1000 },
        { unit: "weeks", divisor: 7 * 24 * 60 * 60 * 1000 },
        { unit: "days", divisor: 24 * 60 * 60 * 1000 },
        { unit: "hours", divisor: 60 * 60 * 1000 },
        { unit: "minutes", divisor: 60 * 1000 },
        { unit: "seconds", divisor: 1000 },
    ];
    
    for (let i = 0; i < timeUnits.length; i++) {
        const { unit, divisor } = timeUnits[i];
        const duration = Math.floor(distance / divisor);
        if (duration > 0) {
            return `${duration} ${unit}`;
        }
    }
    
    return "";
}

//untuk mendapatkan technologies yang dipilih dari checkbox.
function getSelectedTechnologies() {
    let technologies = [];
    if (document.getElementById("tech-one").checked) {
        technologies.push('<i class="fa-brands fa-node"></i>');
  }
  if (document.getElementById("tech-two").checked) {
    technologies.push('<i class="fa-brands fa-react"></i>');
  }
  if (document.getElementById("tech-three").checked) {
    technologies.push('<i class="fa-brands fa-python"></i>');
  }
  if (document.getElementById("tech-four").checked) {
    technologies.push('<i class="fa-brands fa-golang"></i>');
  }
  return technologies;
}

function clear() {
  document.getElementById("projectName").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("upload-image").value = "";
}

// dipanggil secara berkala untuk menampilkan project2 yang telah ditambahkan ke dalam elemen dengan id
function showProjects() {
  let contenElement = document.getElementById("conten");
  contenElement.innerHTML = "";

  //perulangan melalui setiap objek dataProject yang ada dalam array blogs menggunakan indeks i
  for (let i = 0; i < blogs.length; i++) {
    let blog = blogs[i];

    //jadi penampung untuk informasi proyek.
    let projectElement = document.createElement("div");
    projectElement.className = "card-project";

    //jadi penampung project seperti gambar, judul, dan deskripsi.
    let contentElement = document.createElement("div");
    contentElement.className = "content";

    //bikin elemen
    let imageElement = document.createElement("img");
    
    //value
    imageElement.src = blog.image;
    imageElement.alt = "image";

    let headingElement = document.createElement("h4");
    let headingLinkElement = document.createElement("a");
    headingLinkElement.href = "add-project-detail.html";
    headingLinkElement.target = "_blank";
    headingLinkElement.innerText = blog.projectName;
    headingElement.appendChild(headingLinkElement);

    let detailElement = document.createElement("div");
    detailElement.className = "detail-blog-content";
    detailElement.innerText = `durasi ${blog.durasi} | ${blog.author}`;

    let textElement = document.createElement("div");
    textElement.className = "text";
    let descParagraphElement = document.createElement("p");
    descParagraphElement.innerText = blog.desc;
    textElement.appendChild(descParagraphElement);

    let technologiesElement = document.createElement("div");
    technologiesElement.className = "tech";
    technologiesElement.innerHTML = blog.technologies;

    //Seluruh elemen yang telah dibuat sebelumnya ditambahkan ke dalam
    //contentElement secara berurutan menggunakan metodh appendChild()
    contentElement.appendChild(imageElement);
    contentElement.appendChild(headingElement);
    contentElement.appendChild(detailElement);
    contentElement.appendChild(textElement);
    contentElement.appendChild(technologiesElement);

    //contentElement ditambahkan ke dalam projectElement
    projectElement.appendChild(contentElement);

    let editButton = document.createElement("button");
    editButton.innerText = "edit";
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";

    let timestampElement = document.createElement("p");
    timestampElement.style.fontSize = "15px";
    timestampElement.style.float = "right";
    timestampElement.style.color = "grey";
    timestampElement.innerText = getDistanceTime(blog.postAt);

    projectElement.appendChild(editButton);
    projectElement.appendChild(deleteButton);
    projectElement.appendChild(timestampElement);

    // projectElement ditambahkan ke dalam contenElement
    contenElement.appendChild(projectElement);
  }
}

//digunakan untuk menghitung selisih waktu antara
//timeNow (waktu saat ini) dan timePost (waktu yang diberikan sebagai argumen).
function getDistanceTime(time) {
  let timeNow = new Date();
  let timePost = time;

  let distance = timeNow - timePost;

  // array yang berisi object yang merepresentasikan (hari, jam, menit, dan detik)
  //beserta untuk mengkonversi selisih waktu menjadi unit waktu yang sesuai
  const timeUnits = [
    { unit: "day", divisor: 24 * 60 * 60 * 1000 },
    { unit: "hour", divisor: 60 * 60 * 1000 },
    { unit: "minute", divisor: 60 * 1000 },
    { unit: "second", divisor: 1000 },
  ];

  //Pada loop ini, setiap unit waktu dari timeUnits diiterasi. Selisih waktu (distance)
  //dibagi dengan pembagi (divisor)
  //untuk mendapatkan durasi dalam unit waktu tersebut. Jika durasi lebih besar dari 0,
  //maka fungsi mengembalikan string yang menggambarkan durasi waktu dengan format
  //"x unit waktu ago" (x adalah angka durasi). Jika durasi lebih dari 1, maka ditambahkan "s"
  //pada akhir unit waktu untuk menunjukkan bentuk jamak. Misalnya, "5 days ago" (5 hari yang lalu)
  for (let i = 0; i < timeUnits.length; i++) {
    const { unit, divisor } = timeUnits[i];
    const duration = Math.floor(distance / divisor);
    if (duration > 0) {
      return `${duration} ${unit}${duration > 1 ? "s" : ""} ago`;
    }
  }

  //Jika tidak ada durasi waktu yang lebih besar dari 0 pada loop sebelumnya, maka fungsi getDistanceTime(time)
  //mengembalikan string "Just now" yang menunjukkan waktu sangat baru atau saat ini
  return "Just now";
}

setInterval(showProjects, 30000);
