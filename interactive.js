 // Get all sidebar items
 const sidebarItems = document.querySelectorAll('.sidebar li');

 // Add click event listener to each item
 sidebarItems.forEach(item => {
     item.addEventListener('click', () => {
         // Remove active class from all items
         sidebarItems.forEach(item => {
             item.classList.remove('active');
             const link = item.querySelector('a');
             if (link) link.classList.remove('active');
         });

         // Add active class to the clicked item
         item.classList.add('active');
         const link = item.querySelector('a');
         if (link) link.classList.add('active');
     });
 });


    document.addEventListener("DOMContentLoaded", function() {
        function adjustSidebarHeight() {
            const footer = document.querySelector('.footer');
            const sidebar = document.querySelector('.sidebar');
            const footerTop = footer.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;
            const sidebarHeight = footerTop < viewportHeight ? footerTop - sidebar.offsetTop : viewportHeight - sidebar.offsetTop;
            sidebar.style.height = `${sidebarHeight}px`;
        }

        window.addEventListener('resize', adjustSidebarHeight);
        window.addEventListener('scroll', adjustSidebarHeight);
        adjustSidebarHeight();
    });
