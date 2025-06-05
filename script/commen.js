const server = "http://localhost:8080";

const drawer = document.getElementById('drawer');
const openDrawer = () => {
 drawer.style.width = '50%';
}

const closeDrawer = () => {
    drawer.style.width = '0';
}