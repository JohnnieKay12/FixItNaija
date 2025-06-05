const toggleBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');
const desktopLinks = document.querySelectorAll('.desktop-link');
const allLinks = document.querySelectorAll('.desktop-link, .mobile-link');

let isOpen = false;

toggleBtn.addEventListener('click', () => {
    isOpen = !isOpen;

    if (isOpen) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('translate-y-full');

            mobileMenu.classList.add('translate-y-0');
        }, 10);
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden')
    } else {
        closeMobileMenu();
    }
});

function closeMobileMenu() {
    mobileMenu.classList.remove('translate-y-0');

        mobileMenu.classList.add('translate-y-full');

        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        isOpen = false;
        setTimeout(() =>{
            mobileMenu.classList.add('hidden');
        }, 300);
}

function setActiveLink(clickedLink, links) {
    links.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        setActiveLink(e.target, mobileLinks);
        setActiveLink(e.target, desktopLinks);
        closeMobileMenu();
    });
});

desktopLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        setActiveLink(e.target, desktopLinks);
        setActiveLink(e.target, mobileLinks);
    });
});



// Get current path (e.g. /index.html or / about.html)

const currentPath = window.location.pathname;

allLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPath || (currentPath === '/' && linkPath.includes('index'))) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Auto close when any link is clicked
// links.forEach(link => {
//     link.addEventListener('click', () => {

//         mobileMenu.classList.remove('translate-y-0');

//         mobileMenu.classList.add('translate-y-full');

//         hamburgerIcon.classList.remove('hidden');
//         closeIcon.classList.add('hidden');
//         isOpen = false;
//         setTimeout(() => {
//             mobileMenu.classList.add('hidden');
//         }, 300)
//     });
// });











// Featured Artisan Modal

let selectedArtisanPhone = '';

function openModal(name, role, location, phone, review, rating, image) {
    document.getElementById('artisanModalName').textContent = name;
    document.getElementById('artisanModalRole').textContent = role;
    document.getElementById('artisanModalLocation').textContent = ` ${location}`;
    document.getElementById('artisanModalPhone').textContent = ` ${phone}`;
    document.getElementById('artisanModalReview').textContent = review;
    document.getElementById('artisanModalImage').src = image;

    // Save phone for WhatsApp use
    selectedArtisanPhone = phone;

    // Generate stars
    const starContainer = document.getElementById('artisanModalRating');
    starContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        starContainer.innerHTML += i < rating ? '★' : '☆';
    }

    document.getElementById('artisanModal').classList.remove('hidden');
}

function closeArtisanModal() {
    document.getElementById('artisanModal').classList.add('hidden');
}

function openWhatsApp() {
    const cleanedPhone = selectedArtisanPhone.replace(/\D/g, ''); // Remove non-digit characters
    const message = encodeURIComponent("Hello, I'm interested in your service.");
    const whatsappURL = `https://wa.me/${cleanedPhone}?text=${message}`;
    window.open(whatsappURL, '_blank');
}




// List PAge

const artisans = [
    // Page 1

    { name: "John Pipes", service: "Plumber", location: "Ajah, Lagos", img: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.7, desc: "Trusted expert in pipe fittings, leak repairs, and bathroom plumbing with a professional touch.", phone: "2348011111111" },
    { name: "Mubarak Showole", service: "Electrician", location: "Yaba, Lagos", img: "https://images.unsplash.com/photo-1546525848-3ce03ca516f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.8, desc: "Skilled in home wiring, light fixtures, and safe electrical installations.", phone: "2348011111115" },
    { name: "Grace Shine", service: "Cleaner", location: "Gbagada, Lagos", img: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.9, desc: "Specializes in detailed home cleaning, sanitation, and sparkling results.", phone: "2348011111119" },
    { name: "James Paints", service: "Painter", location: "Lekki, Lagos", img: "https://plus.unsplash.com/premium_photo-1675129779554-dc86569708c8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.8, desc: "Delivers vibrant interior and exterior painting with an eye for creative detail.", phone: "2348011111121" },
    { name: "Miracle James", service: "Hair Stylist", location: "Owerri, Imo State", img: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Trendy hairstyles, braids, and flawless beauty transformations.", phone: "2348011111120" },
    { name: "Ayo Ogunseinde", service: "Tailor", location: "Maitama, Abuja", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Custom tailoring with precision stitching and prompt delivery.", phone: "2348011111112" },
    { name: "Tony Spa", service: "Carpenter", location: "Owerri, Imo State", img: "https://plus.unsplash.com/premium_photo-1689562473471-6e736b8afe15?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.6, desc: "Crafting and repairing durable wooden furniture with style.", phone: "2348011111122" },    
    { name: "Emeka Nwankwo", service: "Barber", location: "Enugu, Nigeria", img: "https://images.unsplash.com/photo-1612214070475-1e73f478188c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Smooth fades and precise grooming, ensuring a clean and confident look.", phone: "2348087478087" },
    { name: "Tony Tiles", service: "Tiler", location: "Ajah, Lagos", img: "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Expert tiling for floors and walls with sleek finishing touches.", phone: "2348011111120" },
    
    // Page 2
    
    { name: "Ben Current", service: "Electrician", location: "Ajah, Lagos", img: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.3, desc: "Certified electrician offering years of dependable service and power solutions.", phone: "2348011111116" },
    { name: "Chioma Ade", service: "Fashion Designer", location: "Garki, Abuja", img: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Creative designer specializing in stylish outfits and trendy pieces.", phone: "2348011111112" },
    { name: "Obinna Madu", service: "Mechanics", location: "Aba, Abia State", img: "https://plus.unsplash.com/premium_photo-1706429469466-77cb3272eb4d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Quick, quality repairs for cars and motorbikes, keeping you moving safely.", phone: "2348011111112" },
    { name: "John Spark", service: "Electrician", location: "Ikeja, Lagos", img: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.7, desc: "Known for reliable installations, maintenance, and emergency fixes.", phone: "2348011111117" },
    { name: "Jennifer Lamp", service: "Cleaner", location: "Gbagada, Lagos", img: "https://images.unsplash.com/photo-1509868918748-a554ad25f858?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.9, desc: "Delivers spotless homes with deep cleaning and freshness guaranteed.", phone: "2348011111119" },
    { name: "Samuel Valve", service: "Plumber", location: "Lekki, Lagos", img: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDQ1fHxwZXJzb258ZW58MHx8MHx8fDA%3D", rating: 4.9, desc: "Veteran plumber with over 15 years of experience in residential and commercial plumbing.", phone: "2348011111113" },
    { name: "Joy Samuel", service: "Nail Technician", location: "Ajah, Lagos", img: "https://plus.unsplash.com/premium_photo-1690587673708-d6ba8a1579a5?q=80&w=1358&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Stunning nails with stylish polish and detailed nail art services.", phone: "2348011111120" },
    { name: "Chidera Pai", service: "Hair Stylist", location: "Owerri, Imo State", img: "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Stylish haircuts, color, and extensions tailored to your look.", phone: "2348011111120" },
    { name: "Erik Tc", service: "AC Technicians", location: "Lekki, Lagos", img: "https://images.unsplash.com/photo-1630328311029-6f8b81627fc3?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "AC installation and maintenance services for cool and efficient living.", phone: "2348011111120" },


    // Page 3

    { name: "Caleb John", service: "Painter", location: "Ago, Lagos", img: "https://images.unsplash.com/photo-1558487661-9d4f01e2ad64?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D", rating: 4.5, desc: "Skilled in residential painting and fast touch-up jobs.", phone: "2348011111112" },
    { name: "Victor LeakFix", service: "Plumber", location: "Surulere, Lagos", img: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxtYW58ZW58MHx8MHx8fDA%3D", rating: 4.6, desc: "Your go-to specialist for urgent plumbing issues and leak fixes.", phone: "2348011111114" },
    { name: "Jerry White", service: "Painter", location: "Surlere, Lagos", img: "https://images.unsplash.com/photo-1543084951-1650d1468e2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxtYW58ZW58MHx8MHx8fDA%3D", rating: 4.5, desc: "Exceptional finishing on interiors and exteriors with a professional look.", phone: "2348011111120" },
    { name: "Jaime Kay", service: "Tailor", location: "Ajah, Lagos", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fG1hbnxlbnwwfHwwfHx8MA%3D%3D", rating: 4.5, desc: "Designer wear, alterations, and bespoke clothing tailored to perfection.", phone: "2348011111120" },
    { name: "Ernest Bab", service: "Barber", location: "Ago, Lagos", img: "https://images.unsplash.com/photo-1600442715817-4d9c8b6c729f?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Sharp haircuts and grooming that keeps you looking fresh.", phone: "2348011111120" },
    { name: "Pablo Tile", service: "Tiler", location: "Umuahia, Abia State", img: "https://images.unsplash.com/photo-1611608822650-925c227ef4d2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fG1hbnxlbnwwfHwwfHx8MA%3D%3D", rating: 4.5, desc: "Smooth tile work with neat and durable finishes.", phone: "2348011111120" },
    { name: "Onyii Black", service: "Fashion Designer", location: "Owerri, Imo State", img: "https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxtYW58ZW58MHx8MHx8fDA%3D", rating: 4.5, desc: "Specializes in elegant, modern fashion tailored to fit.", phone: "2348011111120" },
    { name: "Blessing Uche", service: "Braider", location: "Yaba, Lagos", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Beautiful and neat braiding styles for all ages.", phone: "2348011111120" },
    { name: "Ted Amad", service: "AC Technicians", location: "Ikotun, Lagos", img: "https://plus.unsplash.com/premium_photo-1675130119373-61ada6685d63?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fG1hbnxlbnwwfHwwfHx8MA%3D%3D", rating: 4.5, desc: "Efficient cooling solutions with professional AC servicing and repair.", phone: "2348011111120" },
    
    
    // Page 4
    
    { name: "Femi Volt", service: "Electrician", location: "Lekki, Lagos", img: "https://plus.unsplash.com/premium_photo-1723770023600-8083358720aa?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG1hbnxlbnwwfHwwfHx8MA%3D%3D", rating: 4.4, desc: "24/7 service for home wiring, installations, and power maintenance.", phone: "2348011111118" },
    { name: "Blessing Uche", service: "Braider", location: "Yaba, Lagos", img: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww", rating: 4.5, desc: "Stylish and trendy braids that keep your hair looking flawless.", phone: "2348011111120" },
    { name: "Abel Uche", service: "Mechanics", location: "Isolo, Lagos", img: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxtYW58ZW58MHx8MHx8fDA%3D", rating: 4.5, desc: "Reliable repairs and diagnostics for all car issues.", phone: "2348011111120" },
    { name: "Michael Flow", service: "Plumber", location: "Ikeja, Lagos", img: "https://images.unsplash.com/photo-1616002851413-ebcc9611139d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk0fHxtYW58ZW58MHx8MHx8fDA%3D", rating: 4.5, desc: "Professional plumber with quick response and dependable service.", phone: "2348011111112" },
    { name: "Sophia Bello", service: "Makeup Artist", location: "Victoria island, Lagos", img: "https://images.unsplash.com/photo-1554727242-741c14fa561c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Glamorous looks for weddings, events, and photoshoots.", phone: "2348011111120" },
    { name: "Adaeze Okoro", service: "Dreadlocks Stylist", location: "PortHarcourt, River State", img: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", rating: 4.5, desc: "Neat and trendy dreadlock styling with lasting results.", phone: "2348011111120" },
    { name: "Tina Onuoha", service: "Nail Technician", location: "Lekki, Lagos", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.5, desc: "Flawless manicures and creative nail designs.", phone: "2348011111120" },
    { name: "John Obi", service: "Generator Repairs", location: "Gwagwalada, Abuja", img: "https://plus.unsplash.com/premium_photo-1672239496412-ab605befa53f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxtYW58ZW58MHx8MHx8fDA%3D", rating: 4.5, desc: "Generator servicing and fast repairs to keep your power running.", phone: "2348011111120" },
    { name: "Max Wood", service: "Carpenter", location: "Ikeja, Lagos", img: "https://images.unsplash.com/photo-1619169312864-c81168058d7a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ5fHxtYW58ZW58MHx8MHx8fDA%3D", rating: 4.6, desc: "Custom woodwork and reliable home carpentry services.", phone: "2348011111122" },


    // Page 5
    
    { name: "Treasure Mike", service: "Makeup Artist", location: "Festac, Lagos", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", rating: 4.5, desc: "Flawless makeup looks for any occasion, professionally applied.", phone: "2348011111120" },
    { name: "James Kay", service: "Dreadlocks Stylist", location: "Ago, Lagos", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", rating: 4.5, desc: "Neat dread installations, retouching, and maintenance services.", phone: "2348011111120" },
    { name: "Job Manu", service: "Generator Repairs", location: "Festac, Lagos", img: "https://plus.unsplash.com/premium_photo-1689568158814-3b8e9c1a9618?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjcxfHxwZXJzb258ZW58MHx8MHx8fDA%3D", rating: 4.5, desc: "Quality generator repair for steady power and long-lasting performance.", phone: "2348011111120" },
    
    
];
    const cardContainer = document.getElementById('card-container');
    const pageIndicator = document.getElementById('pageIndicator');
    const nextPageBtn = document.getElementById('nextPage');
    const prevPageBtn = document.getElementById('prevPage');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    let currentPage = 1;
    const cardsPerPage = 9;
    function renderCards() {
        const search = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const filtered = artisans.filter(person =>
            (person.name.toLowerCase().includes(search) || person.service.toLowerCase().includes(search)) &&
            (category === '' || person.service === category)
        );
        const start = (currentPage - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const pageData = filtered.slice(start, end);
        cardContainer.innerHTML = '';
        pageData.forEach(person => {
            const card = document.createElement('div');
            card.className = "bg-white rounded-lg shadow p-3 cursor-pointer text-sm";
            card.innerHTML = `
                <img src="${person.img}" class="w-full h-72 object-cover object-top rounded-lg mb-2">
                <h2 class="text-lg font-semibold">${person.name}</h2>
                <p class="text-gray-600">${person.service}</p>
                <p class="text-xs text-gray-500">${person.location}</p>
                <p class="text-yellow-500 font-medium mt-1">⭐ ${person.rating}</p>
            `;
            card.onclick = () => showModal(person);
            cardContainer.appendChild(card);
        });
        pageIndicator.innerText = `Page ${currentPage} of ${Math.ceil(filtered.length / cardsPerPage)}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage >= Math.ceil(filtered.length / cardsPerPage);
    }
    function showModal(person) {
        document.getElementById('modalImg').src = person.img;
        document.getElementById('modalName').innerText = person.name;
        document.getElementById('modalService').innerText = person.service;
        document.getElementById('modalLocation').innerText = person.location;
        document.getElementById('modalDesc').innerText = person.desc;
        document.getElementById('modalRating').innerText = `⭐ ${person.rating}`;
        document.getElementById('modalWhatsapp').href = `https://wa.me/${person.phone}?text=Hi%20${encodeURIComponent(person.name)},%20I'm%20interested%20in%20your%20${person.service}%20services`;
        document.getElementById('modal').classList.remove('hidden');
    }
    function closeModal() {
        document.getElementById('modal').classList.add('hidden');
    }
    nextPageBtn.onclick = () => { currentPage++; renderCards(); };
    prevPageBtn.onclick = () => { currentPage--; renderCards(); };
    searchInput.oninput = () => { currentPage = 1; renderCards(); };
    categoryFilter.onchange = () => { currentPage = 1; renderCards(); };
    renderCards();


    // List Modal compliment Page

    // let currentArtisanId = null;
    // function openModalWithArtisan(artisanId) {
    //     currentArtisanId = artisanId;
    //     loadFeedback();
    //     document.getElementById("artisanModal").classList.remove("hidden");
    // }
    // function loadFeedback() {
    //     const data = JSON.parse(localStorage.getItem("feedback_" + currentArtisanId)) || { likes: 0, compliments: [] };
    //     document.getElementById("likeCount").textContent = data.likes;
    //     renderCompliments(data.compliments);
    // }
    // document.getElementById("likeBtn").addEventListener("click", () => {
    //     const key = "feedback_" + currentArtisanId;
    //     const data = JSON.parse(localStorage.getItem(key)) || { likes: 0, compliments: [] };
    //     data.likes += 1;
    //     localStorage.setItem(key, JSON.stringify(data));
    //     document.getElementById("likeCount").textContent = data.likes;
    // });
    // document.getElementById("submitCompliment").addEventListener("click", () => {
    //     const input = document.getElementById("complimentInput");
    //     const text = input.value.trim();
    //     if (!text) return;
    //     const key = "feedback_" + currentArtisanId;
    //     const data = JSON.parse(localStorage.getItem(key)) || { likes: 0, compliments: [] };
    //     data.compliments.push(text);
    //     localStorage.setItem(key, JSON.stringify(data));
    //     input.value = "";
    //     renderCompliments(data.compliments);
    // });
    // function renderCompliments(list) {
    //     const container = document.getElementById("complimentList");
    //     container.innerHTML = "";
    //     list.forEach(text => {
    //     const li = document.createElement("li");
    //     li.className = "bg-gray-100 px-3 py-2 rounded";
    //     li.textContent = "💬 " + text;
    //     container.appendChild(li);
    //     });
    // }



    // Contact

    