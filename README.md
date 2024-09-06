# ShoddyCast's Pikasprey's Graveler Soft Lock Coding Contest

This is just a small and quick code I did in my spare time inspired by ShoddyCast's video talking about Pikasprey's Graver Soft Lock.

The core functionality of this code is basically just a transliteration of ShoddyCast's code from Python to Javascript, I basically just wanted to see the difference in execution speed if the code runs on Javascript instead of Python.

This code makes use of a Web Worker to run the core code in the background so the browser doesn't freeze while it is running. However, this code doesn't require setting a local server because the core code is in the HTML and is converted into a blob, avoiding running into the same domain restriction.

To run the code, just download the index.html and index.js files on the same folder and open the index.html with your browser of preference.