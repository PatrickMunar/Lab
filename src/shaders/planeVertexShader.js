const planeVertexShader = `
varying vec2 vUv;

void main() {
  vec3 localSpacePosition = position;

  // Ripples
  // float t = sin(localSpacePosition.y * 10.0 + uTime * 5.0);
  // t = remap(t, -1.0, 1.0, 0.0, 0.02);
  // localSpacePosition += t * normal * uRipple;

  vec4 worldPos = modelMatrix * vec4(localSpacePosition, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;

  gl_Position = projectionMatrix * mvPosition;

  vUv = uv;
}
`

export default planeVertexShader
