window.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('#change_btn');
    const icon1 = document.getElementById('icon_1');
    const icon2 = document.getElementById('icon_2');

    console.log(icon1.style.display.includes('none'))
    function changeIcon() {
        if (icon2.style.display.includes('none')) {
            icon1.style.display = 'none';
            icon2.style.display = 'block';
        } else {
            icon1.style.display = 'block'
            icon2.style.display = 'none';
        }
    }
    btn.addEventListener('click', changeIcon);
})