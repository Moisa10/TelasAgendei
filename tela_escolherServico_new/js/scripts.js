document.addEventListener('DOMContentLoaded', function() {
    const categoriesContainer = document.querySelector('.categories');
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        category.addEventListener('click', () => {
            document.querySelector('.category.selected')?.classList.remove('selected');
            category.classList.add('selected');
        });
    });

    categoriesContainer.addEventListener('wheel', (event) => {
        event.preventDefault();
        categoriesContainer.scrollBy({
            left: event.deltaY < 0 ? -30 : 30,
        });
    });
});