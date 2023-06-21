try {
  // Your code that is causing the error
  // For example, the DataTable initialization code
  $(document).ready(function() {
    $('#dataTable').DataTable(); // Replace #myTable with your table selector
  });
} catch (error) {
  // Handle the error by showing it in an alert box
  window.alert('An error occurred: ' + error.message);
}