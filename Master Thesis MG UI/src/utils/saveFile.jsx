export function SaveToFile(myObj) {
  // TODO: Make it work with any object as input.
  let fileName = "DataSample";
  var file;
  let properties = { type: "application/json" }; // Specify the file's mime-type.
  var myObject = {data: myObj};
  let myJSON = JSON.stringify(myObject);

  try {
    // Specify the filename using the File constructor, but ...
    file = new File(myJSON, "DataFusion.json",  properties );
    console.log("File constructor!");
  } catch (e) {
    // ... fall back to the Blob constructor if that isn't supported.
    file = new Blob([myJSON], { type: "application/json" });
    console.log("Blob constructor: " + e.message);
  }
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(file);
  a.download = fileName + ".json";
  a.click();
}

