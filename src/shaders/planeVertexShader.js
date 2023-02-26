const planeVertexShader = `
uniform float uLeft;
uniform float uTime;
uniform float uAmp;

varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.14159265359;

mat2 rotate(float radians) {
  float c = cos(radians);
  float s = sin(radians);
  return mat2(c, -s, s, c);
}

void main() {
  vec3 localSpacePosition = position;

  float frequency = 3.0;
  float newUVx = uv.x * uLeft + (1.0 - uv.x) * (1.0 - uLeft);
  localSpacePosition.z = (sin(uTime * frequency + newUVx * 10.0) * newUVx * 5.0 + sin(uTime * frequency + uv.y * 5.0))* uAmp;

  vec4 worldPos = modelMatrix * vec4(localSpacePosition, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;

  gl_Position = projectionMatrix * mvPosition;

  vUv = uv;
  vPosition = localSpacePosition;
}
`

export default planeVertexShader
