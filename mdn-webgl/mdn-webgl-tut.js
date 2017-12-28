const vsSource = `
attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`;

const fsSource = `
void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;








main();

// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL
function main() {
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl");
    // alert("HELLO!");

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    // Clear colour = black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}