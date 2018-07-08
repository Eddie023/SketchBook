
function download() {
  var dt = $canvas.toDataURL('image/jpeg', 1.0);
  this.href = dt; 
}
document.getElementById('download').addEventListener('click', download, false);
