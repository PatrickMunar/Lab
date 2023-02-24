const planeFragmentShader = `
uniform sampler2D uTexture;
uniform float uGreyIntensity;

varying vec2 vUv;

void main() {
  vec4 color = texture2D(uTexture, vUv);
  float greyScale = 0.5 * color.r + 0.7 * color.g + 0.5 * color.b;
  float greyR = color.r * (1.0 - uGreyIntensity) + greyScale * uGreyIntensity;
  float greyG = color.g * (1.0 - uGreyIntensity) + greyScale * uGreyIntensity;
  float greyB = color.b * (1.0 - uGreyIntensity) + greyScale * uGreyIntensity;
  gl_FragColor = vec4(greyR, greyG, greyB, 1.0);
}
`

export default planeFragmentShader
