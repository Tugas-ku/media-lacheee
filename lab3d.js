/* ═══════════════════════════════════════════════════════════════
   Lacheee Lab3D — renderer WebGL ringan tanpa dependensi eksternal.
   Membuat alat, cairan, partikel, panas, dan APD sebagai objek 3D.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const TAU = Math.PI * 2;
  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  const lerp = (start, end, amount) => start + (end - start) * clamp(amount);
  const colorMix = (start, end, amount) => start.map((value, index) => lerp(value, end[index], amount));

  function identity() {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  function multiply(a, b) {
    const out = new Float32Array(16);
    for (let column = 0; column < 4; column += 1) {
      for (let row = 0; row < 4; row += 1) {
        let value = 0;
        for (let index = 0; index < 4; index += 1) value += a[index * 4 + row] * b[column * 4 + index];
        out[column * 4 + row] = value;
      }
    }
    return out;
  }

  function translation(x, y, z) {
    const out = identity();
    out[12] = x; out[13] = y; out[14] = z;
    return out;
  }

  function scaling(x, y, z) {
    const out = identity();
    out[0] = x; out[5] = y; out[10] = z;
    return out;
  }

  function rotationX(angle) {
    const c = Math.cos(angle); const s = Math.sin(angle);
    return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
  }

  function rotationY(angle) {
    const c = Math.cos(angle); const s = Math.sin(angle);
    return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
  }

  function rotationZ(angle) {
    const c = Math.cos(angle); const s = Math.sin(angle);
    return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  function perspective(fov, aspect, near, far) {
    const f = 1 / Math.tan(fov / 2);
    const range = 1 / (near - far);
    const out = new Float32Array(16);
    out[0] = f / aspect; out[5] = f;
    out[10] = (far + near) * range; out[11] = -1;
    out[14] = 2 * far * near * range;
    return out;
  }

  function lookAt(eye, center, up) {
    let zx = eye[0] - center[0]; let zy = eye[1] - center[1]; let zz = eye[2] - center[2];
    let length = Math.hypot(zx, zy, zz) || 1;
    zx /= length; zy /= length; zz /= length;
    let xx = up[1] * zz - up[2] * zy; let xy = up[2] * zx - up[0] * zz; let xz = up[0] * zy - up[1] * zx;
    length = Math.hypot(xx, xy, xz) || 1;
    xx /= length; xy /= length; xz /= length;
    const yx = zy * xz - zz * xy; const yy = zz * xx - zx * xz; const yz = zx * xy - zy * xx;
    return new Float32Array([
      xx, yx, zx, 0,
      xy, yy, zy, 0,
      xz, yz, zz, 0,
      -(xx * eye[0] + xy * eye[1] + xz * eye[2]),
      -(yx * eye[0] + yy * eye[1] + yz * eye[2]),
      -(zx * eye[0] + zy * eye[1] + zz * eye[2]),
      1
    ]);
  }

  function modelMatrix(object) {
    const t = translation(object.position[0], object.position[1], object.position[2]);
    const rx = rotationX(object.rotation[0]);
    const ry = rotationY(object.rotation[1]);
    const rz = rotationZ(object.rotation[2]);
    const s = scaling(object.scale[0], object.scale[1], object.scale[2]);
    return multiply(t, multiply(ry, multiply(rx, multiply(rz, s))));
  }

  function normalMatrix(object) {
    const rotation = multiply(rotationY(object.rotation[1]), multiply(rotationX(object.rotation[0]), rotationZ(object.rotation[2])));
    const sx = Math.max(0.0001, Math.abs(object.scale[0]));
    const sy = Math.max(0.0001, Math.abs(object.scale[1]));
    const sz = Math.max(0.0001, Math.abs(object.scale[2]));
    return new Float32Array([
      rotation[0] / sx, rotation[1] / sx, rotation[2] / sx,
      rotation[4] / sy, rotation[5] / sy, rotation[6] / sy,
      rotation[8] / sz, rotation[9] / sz, rotation[10] / sz
    ]);
  }

  function cylinderGeometry(radiusTop = 1, radiusBottom = 1, height = 1, segments = 40, openEnded = false) {
    const positions = []; const normals = []; const indices = [];
    const half = height / 2;
    for (let row = 0; row <= 1; row += 1) {
      const radius = row ? radiusTop : radiusBottom;
      const y = row ? half : -half;
      const slope = (radiusBottom - radiusTop) / Math.max(0.001, height);
      for (let segment = 0; segment <= segments; segment += 1) {
        const angle = segment / segments * TAU;
        const x = Math.cos(angle); const z = Math.sin(angle);
        positions.push(x * radius, y, z * radius);
        const normalLength = Math.hypot(x, slope, z);
        normals.push(x / normalLength, slope / normalLength, z / normalLength);
      }
    }
    for (let segment = 0; segment < segments; segment += 1) {
      const a = segment; const b = segment + 1; const c = segments + 1 + segment; const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
    if (!openEnded) {
      const addCap = (top) => {
        const y = top ? half : -half;
        const radius = top ? radiusTop : radiusBottom;
        const center = positions.length / 3;
        positions.push(0, y, 0); normals.push(0, top ? 1 : -1, 0);
        const start = positions.length / 3;
        for (let segment = 0; segment <= segments; segment += 1) {
          const angle = segment / segments * TAU;
          positions.push(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
          normals.push(0, top ? 1 : -1, 0);
        }
        for (let segment = 0; segment < segments; segment += 1) {
          if (top) indices.push(center, start + segment, start + segment + 1);
          else indices.push(center, start + segment + 1, start + segment);
        }
      };
      addCap(true); addCap(false);
    }
    return { positions, normals, indices };
  }

  function sphereGeometry(radius = 1, latitude = 18, longitude = 30) {
    const positions = []; const normals = []; const indices = [];
    for (let lat = 0; lat <= latitude; lat += 1) {
      const theta = lat / latitude * Math.PI;
      const sinTheta = Math.sin(theta); const cosTheta = Math.cos(theta);
      for (let lon = 0; lon <= longitude; lon += 1) {
        const phi = lon / longitude * TAU;
        const x = Math.cos(phi) * sinTheta; const y = cosTheta; const z = Math.sin(phi) * sinTheta;
        positions.push(x * radius, y * radius, z * radius); normals.push(x, y, z);
      }
    }
    for (let lat = 0; lat < latitude; lat += 1) {
      for (let lon = 0; lon < longitude; lon += 1) {
        const first = lat * (longitude + 1) + lon; const second = first + longitude + 1;
        indices.push(first, second, first + 1, second, second + 1, first + 1);
      }
    }
    return { positions, normals, indices };
  }

  function torusGeometry(majorRadius = 1, tubeRadius = 0.2, radialSegments = 20, tubularSegments = 44) {
    const positions = []; const normals = []; const indices = [];
    for (let radial = 0; radial <= radialSegments; radial += 1) {
      const v = radial / radialSegments * TAU;
      const cosV = Math.cos(v); const sinV = Math.sin(v);
      for (let tubular = 0; tubular <= tubularSegments; tubular += 1) {
        const u = tubular / tubularSegments * TAU;
        const cosU = Math.cos(u); const sinU = Math.sin(u);
        positions.push(
          (majorRadius + tubeRadius * cosV) * cosU,
          tubeRadius * sinV,
          (majorRadius + tubeRadius * cosV) * sinU
        );
        normals.push(cosV * cosU, sinV, cosV * sinU);
      }
    }
    for (let radial = 0; radial < radialSegments; radial += 1) {
      for (let tubular = 0; tubular < tubularSegments; tubular += 1) {
        const first = radial * (tubularSegments + 1) + tubular;
        const second = first + tubularSegments + 1;
        indices.push(first, second, first + 1, second, second + 1, first + 1);
      }
    }
    return { positions, normals, indices };
  }

  function latheGeometry(profile, segments = 64) {
    const positions = []; const normals = []; const indices = [];
    for (let ring = 0; ring < profile.length; ring += 1) {
      const previous = profile[Math.max(0, ring - 1)];
      const next = profile[Math.min(profile.length - 1, ring + 1)];
      const tangentRadius = next[0] - previous[0];
      const tangentY = next[1] - previous[1];
      const normalLength = Math.hypot(tangentY, tangentRadius) || 1;
      for (let segment = 0; segment <= segments; segment += 1) {
        const angle = segment / segments * TAU;
        const cos = Math.cos(angle); const sin = Math.sin(angle);
        positions.push(profile[ring][0] * cos, profile[ring][1], profile[ring][0] * sin);
        normals.push((tangentY / normalLength) * cos, -tangentRadius / normalLength, (tangentY / normalLength) * sin);
      }
    }
    for (let ring = 0; ring < profile.length - 1; ring += 1) {
      for (let segment = 0; segment < segments; segment += 1) {
        const first = ring * (segments + 1) + segment;
        const second = first + segments + 1;
        indices.push(first, second, first + 1, second, second + 1, first + 1);
      }
    }
    return { positions, normals, indices };
  }

  function boxGeometry(width = 1, height = 1, depth = 1) {
    const x = width / 2; const y = height / 2; const z = depth / 2;
    const positions = [
      -x,-y,z, x,-y,z, x,y,z, -x,y,z, x,-y,-z, -x,-y,-z, -x,y,-z, x,y,-z,
      -x,y,z, x,y,z, x,y,-z, -x,y,-z, -x,-y,-z, x,-y,-z, x,-y,z, -x,-y,z,
      x,-y,z, x,-y,-z, x,y,-z, x,y,z, -x,-y,-z, -x,-y,z, -x,y,z, -x,y,-z
    ];
    const normals = [
      0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
      0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,
      1,0,0, 1,0,0, 1,0,0, 1,0,0, -1,0,0, -1,0,0, -1,0,0, -1,0,0
    ];
    const indices = [];
    for (let face = 0; face < 6; face += 1) {
      const offset = face * 4; indices.push(offset, offset + 1, offset + 2, offset, offset + 2, offset + 3);
    }
    return { positions, normals, indices };
  }

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader gagal dikompilasi");
    return shader;
  }

  function createProgram(gl) {
    const vertex = compileShader(gl, gl.VERTEX_SHADER, `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      attribute vec2 aUv;
      uniform mat4 uModel;
      uniform mat4 uView;
      uniform mat4 uProjection;
      uniform mat3 uNormalMatrix;
      uniform float uTime;
      uniform float uEffect;
      uniform float uEffectStrength;
      varying vec3 vNormal;
      varying vec3 vWorld;
      varying vec2 vUv;
      void main(){
        vec3 position = aPosition;
        if(uEffect > 0.5 && uEffect < 1.5){
          float ripple = sin((position.x + position.z) * 8.0 + uTime * 4.5) * 0.035;
          position.y += ripple * uEffectStrength;
        }
        if(uEffect > 1.5){
          float flicker = sin(position.y * 7.0 + uTime * 12.0) * 0.08 + sin(uTime * 19.0) * 0.035;
          position.xz *= 1.0 + flicker * uEffectStrength;
          position.x += sin(position.y * 5.0 + uTime * 8.0) * 0.06 * uEffectStrength;
        }
        vec4 world = uModel * vec4(position, 1.0);
        vWorld = world.xyz;
        vNormal = normalize(uNormalMatrix * aNormal);
        vUv = aUv;
        gl_Position = uProjection * uView * world;
      }
    `);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform vec4 uColor;
      uniform vec3 uEye;
      uniform float uGlass;
      uniform sampler2D uTexture;
      uniform float uUseTexture;
      uniform float uMetallic;
      uniform float uRoughness;
      varying vec3 vNormal;
      varying vec3 vWorld;
      varying vec2 vUv;
      void main(){
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(vec3(4.5, 8.0, 6.0) - vWorld);
        vec3 viewDir = normalize(uEye - vWorld);
        float diffuse = max(dot(normal, lightDir), 0.0);
        float shininess = uGlass > 0.5 ? 82.0 : mix(92.0, 9.0, uRoughness);
        float specular = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), shininess);
        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.0);
        vec3 textureColor = texture2D(uTexture, vUv).rgb;
        vec3 albedo = mix(uColor.rgb, uColor.rgb * mix(vec3(0.72), textureColor, 0.62), uUseTexture);
        vec3 reflected = reflect(-viewDir, normal);
        vec3 environment = mix(vec3(0.16, 0.36, 0.39), vec3(0.92, 0.98, 1.0), clamp(reflected.y * 0.5 + 0.5, 0.0, 1.0));
        vec3 base = albedo * (0.28 + diffuse * 0.78) + vec3(specular * mix(0.34, 0.92, uMetallic));
        base = mix(base, environment * albedo, uMetallic * 0.48);
        if(uGlass > 0.5){
          base = mix(base, environment, 0.36 + fresnel * 0.38);
          base += vec3(0.22, 0.42, 0.46) * fresnel * 0.35;
        }
        gl_FragColor = vec4(base, uColor.a);
      }
    `);
    const program = gl.createProgram();
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Program WebGL gagal");
    return program;
  }

  function uploadGeometry(gl, geometry) {
    const position = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, position); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.positions), gl.STATIC_DRAW);
    const normal = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, normal); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.normals), gl.STATIC_DRAW);
    const uvValues = geometry.uvs || new Array((geometry.positions.length / 3) * 2).fill(0);
    const uv = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, uv); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvValues), gl.STATIC_DRAW);
    const index = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry.indices), gl.STATIC_DRAW);
    return { position, normal, uv, index, count: geometry.indices.length };
  }

  class LabScene {
    constructor(canvas, options) {
      this.canvas = canvas;
      this.options = options;
      this.gl = canvas.getContext("webgl", { antialias: true, alpha: false, premultipliedAlpha: false });
      if (!this.gl) throw new Error("WebGL tidak tersedia");
      this.program = createProgram(this.gl);
      this.locations = {
        position: this.gl.getAttribLocation(this.program, "aPosition"),
        normal: this.gl.getAttribLocation(this.program, "aNormal"),
        uv: this.gl.getAttribLocation(this.program, "aUv"),
        model: this.gl.getUniformLocation(this.program, "uModel"),
        view: this.gl.getUniformLocation(this.program, "uView"),
        projection: this.gl.getUniformLocation(this.program, "uProjection"),
        normalMatrix: this.gl.getUniformLocation(this.program, "uNormalMatrix"),
        color: this.gl.getUniformLocation(this.program, "uColor"),
        eye: this.gl.getUniformLocation(this.program, "uEye"),
        glass: this.gl.getUniformLocation(this.program, "uGlass")
        ,time: this.gl.getUniformLocation(this.program, "uTime")
        ,effect: this.gl.getUniformLocation(this.program, "uEffect")
        ,effectStrength: this.gl.getUniformLocation(this.program, "uEffectStrength")
        ,texture: this.gl.getUniformLocation(this.program, "uTexture")
        ,useTexture: this.gl.getUniformLocation(this.program, "uUseTexture")
        ,metallic: this.gl.getUniformLocation(this.program, "uMetallic")
        ,roughness: this.gl.getUniformLocation(this.program, "uRoughness")
      };
      this.meshes = {
        cylinder: uploadGeometry(this.gl, cylinderGeometry(1, 1, 1, 44, false)),
        tube: uploadGeometry(this.gl, cylinderGeometry(1, 1, 1, 44, true)),
        cone: uploadGeometry(this.gl, cylinderGeometry(0.45, 1, 1, 44, false)),
        sphere: uploadGeometry(this.gl, sphereGeometry(1)),
        torus: uploadGeometry(this.gl, torusGeometry()),
        beaker: uploadGeometry(this.gl, latheGeometry([[0,-0.5],[0.82,-0.5],[0.96,-0.46],[1,-0.36],[1,0.38],[1.06,0.47],[0.98,0.5]])),
        graduatedCylinder: uploadGeometry(this.gl, latheGeometry([[0,-0.5],[0.48,-0.5],[0.58,-0.47],[0.61,0.4],[0.68,0.47],[0.57,0.5]])),
        erlenmeyer: uploadGeometry(this.gl, latheGeometry([[0,-0.5],[0.72,-0.5],[1,-0.44],[0.94,-0.25],[0.36,0.39],[0.27,0.5]])),
        testTube: uploadGeometry(this.gl, latheGeometry([[0,-0.5],[0.62,-0.48],[0.9,-0.4],[1,-0.28],[1,0.46],[1.06,0.5]])),
        roundFlask: uploadGeometry(this.gl, latheGeometry([[0,-1],[0.5,-0.92],[0.86,-0.58],[1,-0.08],[0.92,0.45],[0.58,0.78],[0.28,0.92],[0.26,1]])),
        volumetricFlask: uploadGeometry(this.gl, latheGeometry([[0,-1],[0.58,-0.94],[0.94,-0.62],[1,-0.08],[0.9,0.46],[0.52,0.78],[0.25,0.92],[0.24,1]])),
        separator: uploadGeometry(this.gl, latheGeometry([[0,-1],[0.16,-0.87],[0.62,-0.6],[0.98,-0.15],[0.86,0.38],[0.42,0.76],[0.3,1]])),
        watchGlass: uploadGeometry(this.gl, latheGeometry([[0,-0.16],[0.24,-0.15],[0.52,-0.11],[0.78,-0.02],[1,0.13],[1.04,0.2]])),
        mortar: uploadGeometry(this.gl, latheGeometry([[0,-0.55],[0.52,-0.52],[0.86,-0.36],[1,0.05],[1.08,0.38],[1.02,0.5]])),
        crucible: uploadGeometry(this.gl, latheGeometry([[0,-0.5],[0.7,-0.5],[0.82,-0.42],[1,0.42],[1.05,0.5]])),
        box: uploadGeometry(this.gl, boxGeometry())
      };
      this.objects = [];
      this.textures = [];
      this.yaw = -0.52;
      this.pitch = 0.24;
      this.distance = 9.2;
      this.drag = null;
      this.disposed = false;
      this.build();
      this.fitCamera();
    }

    add(mesh, color, options = {}) {
      const object = {
        mesh,
        color: color.slice(0, 3),
        alpha: color[3] === undefined ? 1 : color[3],
        glass: Boolean(options.glass),
        role: options.role || "",
        position: (options.position || [0, 0, 0]).slice(),
        rotation: (options.rotation || [0, 0, 0]).slice(),
        scale: (options.scale || [1, 1, 1]).slice(),
        visible: options.visible !== false,
        data: Object.assign({}, options.data || {})
        ,effect: Number(options.effect || 0)
        ,effectStrength: options.effectStrength === undefined ? 1 : Number(options.effectStrength)
        ,texture: options.texture || null
        ,metallic: options.metallic === undefined ? 0 : Number(options.metallic)
        ,roughness: options.roughness === undefined ? 0.45 : Number(options.roughness)
      };
      this.objects.push(object);
      return object;
    }

    fitCamera() {
      const ignored = new Set(["drop", "steam", "moisture", "transferDrop"]);
      const objects = this.objects.slice(3).filter((object) => !ignored.has(object.role));
      if (!objects.length) return;
      const min = [Infinity, Infinity, Infinity]; const max = [-Infinity, -Infinity, -Infinity];
      objects.forEach((object) => {
        for (let axis = 0; axis < 3; axis += 1) {
          const radius = Math.max(0.08, Math.abs(object.scale[axis]));
          min[axis] = Math.min(min[axis], object.position[axis] - radius);
          max[axis] = Math.max(max[axis], object.position[axis] + radius);
        }
      });
      const width = max[0] - min[0]; const height = max[1] - min[1]; const depth = max[2] - min[2];
      const largest = Math.max(width, height * 1.08, depth);
      this.distance = clamp(largest * 1.42 + 3.4, 7.4, 13.4);
      this.yaw = width > height * 1.45 ? -0.72 : -0.56;
      this.pitch = height > width * 1.3 ? 0.2 : 0.27;
    }

    addGlassVessel(x, radius, height, bottom, liquidColor, role = "liquid", shape = "cylinder") {
      const outer = this.add(shape === "cone" ? "cone" : "tube", [0.72, 0.93, 0.96, 0.27], {
        glass: true, position: [x, bottom + height / 2, 0], scale: [radius, height, radius]
      });
      this.add("cylinder", [0.75, 0.92, 0.94, 0.24], { glass: true, position: [x, bottom + 0.035, 0], scale: [radius * 0.98, 0.07, radius * 0.98] });
      this.add("tube", [0.9, 1, 1, 0.42], { glass: true, position: [x, bottom + height - 0.02, 0], scale: [radius * 1.035, 0.08, radius * 1.035] });
      const liquid = this.add(shape === "cone" ? "cone" : "cylinder", liquidColor, {
        role, position: [x, bottom, 0], scale: [radius * 0.91, 0.01, radius * 0.91],
        data: { bottom, maxHeight: height * 0.9, radius: radius * 0.91 }
      });
      return { outer, liquid };
    }

    addStand(x = 0) {
      this.add("box", [0.22, 0.28, 0.27, 1], { position: [x, -1.29, 0], scale: [2.4, 0.12, 1.2] });
      this.add("cylinder", [0.35, 0.4, 0.39, 1], { position: [x - 0.82, 0.15, 0], scale: [0.08, 3.0, 0.08] });
      this.add("box", [0.37, 0.42, 0.41, 1], { position: [x - 0.35, 0.65, 0], scale: [0.95, 0.08, 0.08] });
    }

    addParticles(count, center, spread, role = "particle", color = [0.58, 0.27, 0.82, 0.92], options = {}) {
      for (let index = 0; index < count; index += 1) {
        const angle = index * 2.399;
        const radius = ((index % 7) / 7) * spread;
        const isSolidPile = role === "sampleParticle";
        const normalizedRadius = spread > 0 ? radius / spread : 0;
        const supportY = center[1] + (options.surfaceCurve || 0) * normalizedRadius * normalizedRadius;
        const pileRise = (options.pileHeight || 0.08) * clamp((1 - normalizedRadius) / 0.55);
        const particleY = supportY + pileRise + 0.055 + (index % 3) * 0.012;
        this.add("sphere", color, {
          role,
          visible: !["sampleParticle", "grain"].includes(role),
          position: [
            center[0] + Math.cos(angle) * radius,
            isSolidPile ? particleY : center[1] + ((index * 17) % 13) / 13 * spread,
            center[2] + Math.sin(angle) * radius
          ],
          scale: isSolidPile ? [0.085, 0.065, 0.085] : [0.075, 0.075, 0.075],
          data: { index, baseAngle: angle, radius, supportY }
        });
      }
    }

    addSolidPile(x, surfaceY, z, radius, height, color, role = "solidPile", data = {}) {
      return this.add("cone", color, {
        role,
        visible: role === "sourceSolidMound",
        position: [x, surfaceY + height / 2, z],
        scale: [radius, height, radius],
        data: Object.assign({
          surfaceY,
          basePosition: [x, surfaceY + height / 2, z],
          baseScale: [radius, height, radius]
        }, data)
      });
    }

    addGraduations(x, bottom, height, radius, count = 12, options = {}) {
      const color = options.color || [0.12, 0.25, 0.27, 0.88];
      const requestedZ = options.z === undefined ? radius + 0.01 : options.z;
      const z = Math.min(requestedZ, radius * 0.92 + 0.012);
      for (let index = 0; index <= count; index += 1) {
        const major = index % 5 === 0;
        const width = major ? (options.majorWidth || radius * 0.72) : (options.minorWidth || radius * 0.42);
        this.add("box", color, {
          position: [x + radius * (major ? 0.08 : 0.16), bottom + (index / count) * height, z],
          scale: [width, major ? 0.022 : 0.013, 0.014]
        });
      }
    }

    addLiquidSurface(x, bottom, maxHeight, radius, sourceRole = "liquid", options = {}) {
      return this.add("sphere", options.color || [0.22, 0.7, 0.92, 0.82], {
        role: "liquidSurface", visible: false, effect: 1, effectStrength: 0.9,
        position: [x, bottom, options.z || 0], scale: [radius, 0.055, radius],
        data: {
          bottom, maxHeight, radius, sourceRole,
          bottomRadius: options.bottomRadius || radius,
          topRadius: options.topRadius || radius,
          centerX: x
        }
      });
    }

    addBeaker(x = 0, bottom = -1.34, radius = 1.05, height = 2.15, liquidRole = "liquid", liquidColor = [0.1, 0.56, 0.86, 0.8]) {
      const glass = [0.72, 0.94, 0.98, 0.25];
      this.add("beaker", glass, { glass: true, position: [x, bottom + height / 2, 0], scale: [radius, height, radius] });
      this.add("cylinder", [0.77, 0.95, 0.98, 0.22], { glass: true, position: [x, bottom + 0.035, 0], scale: [radius * 0.99, 0.07, radius * 0.99] });
      this.add("torus", [0.84, 0.98, 1, 0.38], { glass: true, position: [x, bottom + height, 0], scale: [radius, radius, radius] });
      this.add("cone", [0.77, 0.95, 0.98, 0.28], { glass: true, position: [x + radius * 0.92, bottom + height - 0.08, 0], rotation: [0, 0, -Math.PI / 2], scale: [0.16, 0.34, 0.18] });
      this.addGraduations(x, bottom + 0.38, height * 0.65, radius, 8, { majorWidth: radius * 0.62, minorWidth: radius * 0.38 });
      const liquid = this.add("cylinder", liquidColor, {
        role: liquidRole, position: [x, bottom, 0], scale: [radius * 0.92, 0.01, radius * 0.92],
        data: { bottom, maxHeight: height * 0.84, radius: radius * 0.92 }
      });
      this.addLiquidSurface(x, bottom, height * 0.84, radius * 0.92, liquidRole, { color: liquidColor });
      return liquid;
    }

    addTestTube(x = 0, bottom = -1.15, height = 2.8, radius = 0.34, liquidRole = "liquid", liquidColor = [0.12, 0.56, 0.85, 0.8], rotation = [0, 0, 0]) {
      const glass = [0.75, 0.95, 0.98, 0.28];
      this.add("testTube", glass, { glass: true, position: [x, bottom + height / 2, 0], rotation, scale: [radius, height, radius] });
      this.add("torus", [0.86, 0.99, 1, 0.42], { glass: true, position: [x, bottom + height, 0], rotation, scale: [radius, radius, radius] });
      const liquid = this.add("cylinder", liquidColor, {
        role: liquidRole, position: [x, bottom, 0], rotation, scale: [radius * 0.78, 0.01, radius * 0.78],
        data: { bottom, maxHeight: height * 0.68, radius: radius * 0.78 }
      });
      if (liquidRole) this.addLiquidSurface(x, bottom, height * 0.68, radius * 0.78, liquidRole, { color: liquidColor });
      return liquid;
    }

    addErlenmeyer(x = 0, bottom = -1.35, radius = 1.35, bodyHeight = 1.75, neckHeight = 1.25, liquidRole = "liquid", liquidColor = [0.16, 0.55, 0.84, 0.78]) {
      const glass = [0.72, 0.94, 0.98, 0.25];
      this.add("erlenmeyer", glass, { glass: true, position: [x, bottom + bodyHeight / 2, 0], scale: [radius, bodyHeight, radius] });
      this.add("tube", glass, { glass: true, position: [x, bottom + bodyHeight + neckHeight / 2 - 0.12, 0], scale: [radius * 0.34, neckHeight, radius * 0.34] });
      this.add("torus", [0.84, 0.98, 1, 0.4], { glass: true, position: [x, bottom + bodyHeight + neckHeight - 0.12, 0], scale: [radius * 0.34, radius * 0.34, radius * 0.34] });
      this.addGraduations(x, bottom + 0.35, bodyHeight * 0.62, radius * 0.72, 5, { majorWidth: radius * 0.48, minorWidth: radius * 0.28 });
      const liquid = this.add("cone", liquidColor, {
        role: liquidRole, position: [x, bottom, 0], scale: [radius * 0.9, 0.01, radius * 0.9],
        data: { bottom, maxHeight: bodyHeight * 0.74, radius: radius * 0.9 }
      });
      this.addLiquidSurface(x, bottom, bodyHeight * 0.74, radius * 0.88, liquidRole, {
        color: liquidColor, bottomRadius: radius * 0.88, topRadius: radius * 0.3
      });
      return liquid;
    }

    addRoundFlask(x = 0, bottom = -1.2, radius = 1.15, neckHeight = 1.55, liquidRole = "liquid", liquidColor = [0.12, 0.55, 0.84, 0.8]) {
      const glass = [0.72, 0.94, 0.98, 0.25];
      this.add("roundFlask", glass, { glass: true, position: [x, bottom + radius, 0], scale: [radius, radius * 1.05, radius] });
      this.add("tube", glass, { glass: true, position: [x, bottom + radius * 1.75 + neckHeight / 2, 0], scale: [radius * 0.26, neckHeight, radius * 0.26] });
      this.add("torus", [0.85, 0.99, 1, 0.4], { glass: true, position: [x, bottom + radius * 1.75 + neckHeight, 0], scale: [radius * 0.26, radius * 0.26, radius * 0.26] });
      const liquid = this.add("sphere", liquidColor, {
        role: liquidRole, position: [x, bottom, 0], scale: [radius * 0.88, 0.01, radius * 0.88],
        data: { bottom, maxHeight: radius * 1.55, radius: radius * 0.88 }
      });
      this.addLiquidSurface(x, bottom, radius * 1.55, radius * 0.82, liquidRole, { color: liquidColor });
      return liquid;
    }

    addPipette(x = 0, centerY = 0.25, kind = "volume", liquidRole = "liquid") {
      const glass = [0.76, 0.95, 0.98, 0.3];
      const fluid = [0.08, 0.55, 0.88, 0.82];
      if (kind === "dropper") {
        this.add("sphere", [0.12, 0.16, 0.17, 1], {
          role: "dropperBulb", position: [x, centerY + 1.62, 0], scale: [0.48, 0.72, 0.48],
          data: { baseScale: [0.48, 0.72, 0.48] }
        });
        this.add("cylinder", [0.2, 0.24, 0.24, 1], { position: [x, centerY + 1.12, 0], scale: [0.24, 0.28, 0.24] });
        this.add("tube", glass, { glass: true, position: [x, centerY - 0.12, 0], scale: [0.16, 2.35, 0.16] });
        this.add("cone", glass, { glass: true, position: [x, centerY - 1.52, 0], rotation: [Math.PI, 0, 0], scale: [0.14, 0.62, 0.14] });
        this.add("cylinder", fluid, {
          role: "pipetteLiquid", position: [x, centerY - 0.82, 0], scale: [0.105, 0.01, 0.105],
          data: { kind, bottom: centerY - 1.42, maxHeight: 1.85 }
        });
        this.add("sphere", fluid, { role: "dropperTipDrop", visible: false, position: [x, centerY - 1.87, 0], scale: [0.08, 0.12, 0.08] });
        return;
      }

      // Pipet volume memiliki satu bulb pusat dan satu tanda kalibrasi; pipet ukur
      // mempertahankan diameter seragam dengan banyak graduasi.
      if (kind === "volume") {
        this.add("tube", glass, { glass: true, position: [x, centerY + 1.16, 0], scale: [0.105, 1.52, 0.105] });
        this.add("sphere", glass, { glass: true, position: [x, centerY, 0], scale: [0.42, 0.76, 0.42] });
        this.add("tube", glass, { glass: true, position: [x, centerY - 1.22, 0], scale: [0.105, 1.72, 0.105] });
        this.add("cone", glass, { glass: true, position: [x, centerY - 2.18, 0], rotation: [Math.PI, 0, 0], scale: [0.095, 0.5, 0.095] });
        this.add("torus", [0.14, 0.27, 0.3, 0.98], { position: [x, centerY + 0.72, 0], scale: [0.108, 0.108, 0.108] });
        this.add("cylinder", fluid, {
          role: "pipetteLiquid", position: [x, centerY - 1.9, 0], scale: [0.072, 0.01, 0.072],
          data: { kind, bottom: centerY - 1.9, maxHeight: 2.64 }
        });
        this.add("sphere", fluid, {
          role: "pipetteBulbFluid", visible: false, position: [x, centerY - 0.03, 0], scale: [0.32, 0.05, 0.32],
          data: { baseScale: [0.32, 0.62, 0.32] }
        });
      } else {
        this.add("tube", glass, { glass: true, position: [x, centerY - 0.08, 0], scale: [0.145, 3.85, 0.145] });
        this.add("cone", glass, { glass: true, position: [x, centerY - 2.25, 0], rotation: [Math.PI, 0, 0], scale: [0.13, 0.58, 0.13] });
        this.addGraduations(x, centerY - 1.6, 3.08, 0.145, 30, { majorWidth: 0.27, minorWidth: 0.15, z: 0.18 });
        this.add("cylinder", fluid, {
          role: "pipetteLiquid", position: [x, centerY - 1.82, 0], scale: [0.1, 0.01, 0.1],
          data: { kind, bottom: centerY - 1.82, maxHeight: 3.15 }
        });
      }

      // Filler tiga-katup sederhana agar siswa tidak mengisap dengan mulut.
      this.add("sphere", [0.82, 0.16, 0.12, 1], { role: "pipetteFiller", position: [x, centerY + 2.25, 0], scale: [0.38, 0.55, 0.38] });
      this.add("cylinder", [0.14, 0.18, 0.18, 1], { position: [x, centerY + 1.86, 0], scale: [0.17, 0.28, 0.17] });
    }

    addDroplets(x, topY, count = 5) {
      for (let index = 0; index < count; index += 1) this.add("sphere", [0.1, 0.58, 0.9, 0.88], {
        role: "drop", visible: false, position: [x, topY - index * 0.18, 0], scale: [0.055, 0.1, 0.055], data: { index, topY }
      });
    }

    addHeatingEffects(x = 0, liquidBottom = -0.9, liquidRadius = 1, steamY = 1.6) {
      for (let index = 0; index < 18; index += 1) this.add("sphere", [0.86, 0.97, 1, 0.55], {
        role: "bubble", visible: false, position: [x, liquidBottom, 0], scale: [0.08, 0.08, 0.08], data: { index, centerX: x, bottom: liquidBottom, radius: liquidRadius }
      });
      for (let index = 0; index < 9; index += 1) this.add("sphere", [0.92, 0.96, 0.96, 0.22], {
        role: "steam", visible: false, position: [x, steamY, 0], scale: [0.2, 0.3, 0.2], data: { index, centerX: x, steamY }
      });
    }

    addBunsen(x = 0, bottom = -1.35, includeFlame = true) {
      this.add("cylinder", [0.16, 0.2, 0.21, 1], { position: [x, bottom + 0.09, 0], scale: [0.9, 0.18, 0.9] });
      this.add("cone", [0.35, 0.41, 0.41, 1], { position: [x, bottom + 0.38, 0], scale: [0.5, 0.52, 0.5] });
      this.add("cylinder", [0.52, 0.58, 0.57, 1], { position: [x, bottom + 1.14, 0], scale: [0.25, 1.48, 0.25] });
      this.add("torus", [0.7, 0.75, 0.73, 1], { position: [x, bottom + 1.88, 0], scale: [0.25, 0.25, 0.25] });
      this.add("cylinder", [0.24, 0.29, 0.29, 1], {
        role: "airCollar", position: [x, bottom + 0.72, 0], scale: [0.36, 0.34, 0.36], data: { baseY: bottom + 0.72 }
      });
      for (let side = -1; side <= 1; side += 2) this.add("cylinder", [0.035, 0.05, 0.05, 1], {
        role: "airHole", position: [x + side * 0.29, bottom + 0.74, 0], rotation: [0, 0, Math.PI / 2], scale: [0.07, 0.055, 0.07], data: { side }
      });
      this.add("cylinder", [0.18, 0.23, 0.23, 1], { position: [x + 0.42, bottom + 0.48, 0], rotation: [0, 0, Math.PI / 2], scale: [0.12, 0.62, 0.12] });
      this.add("cylinder", [0.68, 0.47, 0.18, 1], { role: "gasValve", position: [x + 0.78, bottom + 0.48, 0], rotation: [0, 0, Math.PI / 2], scale: [0.16, 0.2, 0.16] });
      if (includeFlame) {
        this.add("cone", [1, 0.55, 0.08, 0.88], { role: "flameOuter", effect: 2, effectStrength: 1.2, position: [x, bottom + 2.5, 0], scale: [0.56, 1.16, 0.56] });
        this.add("cone", [1, 0.93, 0.36, 0.92], { role: "flameInner", effect: 2, effectStrength: 0.8, position: [x, bottom + 2.25, 0], scale: [0.27, 0.64, 0.27] });
      }
    }

    addInstrumentBody(x, bottom, width, height, depth, color = [0.82, 0.85, 0.82, 1]) {
      this.add("box", color, { position: [x, bottom + height / 2, 0], scale: [width, height, depth] });
      this.add("box", [0.12, 0.18, 0.18, 1], { role: "display", position: [x + width * 0.18, bottom + height * 0.55, depth / 2 + 0.025], scale: [width * 0.38, height * 0.2, 0.05] });
      this.add("cylinder", [0.16, 0.2, 0.2, 1], { position: [x - width * 0.27, bottom + height * 0.25, depth / 2 + 0.09], rotation: [Math.PI / 2, 0, 0], scale: [0.12, 0.08, 0.12] });
    }

    addGroupPart(mesh, color, localPosition, options = {}) {
      const anchors = options.anchors || [[-2.55, 0.15, 0], [-0.2, 0.75, 0], [2.25, 0.15, 0]];
      const stageRotations = options.stageRotations || [0, -0.28, 0];
      const start = anchors[0];
      return this.add(mesh, color, {
        glass: options.glass, role: "toolPart",
        position: [start[0] + localPosition[0], start[1] + localPosition[1], start[2] + localPosition[2]],
        rotation: options.rotation || [0, 0, 0], scale: options.scale || [1, 1, 1],
        data: {
          localPosition: localPosition.slice(), localRotation: (options.rotation || [0, 0, 0]).slice(),
          baseScale: (options.scale || [1, 1, 1]).slice(), anchors, stageRotations,
          subRole: options.subRole || "", jawSide: options.jawSide || 0
        }
      });
    }

    addMannequin(x = 0) {
      this.add("sphere", [0.82, 0.63, 0.48, 1], { position: [x, 1.65, 0], scale: [0.58, 0.68, 0.58] });
      this.add("cone", [0.24, 0.46, 0.64, 1], { position: [x, -0.02, 0], scale: [0.96, 2.5, 0.7] });
      this.add("cylinder", [0.82, 0.63, 0.48, 1], { position: [x - 1.05, -0.08, 0], rotation: [0, 0, -0.1], scale: [0.18, 2.0, 0.18] });
      this.add("cylinder", [0.82, 0.63, 0.48, 1], { position: [x + 1.05, -0.08, 0], rotation: [0, 0, 0.1], scale: [0.18, 2.0, 0.18] });
    }

    createTextureFromBytes(bytes, mimeType = "image/png") {
      const gl = this.gl;
      if (!gl.createTexture || typeof Image === "undefined" || typeof Blob === "undefined") return null;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([210, 220, 218, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      const image = new Image();
      const url = URL.createObjectURL(new Blob([bytes], { type: mimeType }));
      image.onload = () => {
        if (this.disposed) { URL.revokeObjectURL(url); return; }
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        URL.revokeObjectURL(url);
        this.render();
      };
      image.onerror = () => URL.revokeObjectURL(url);
      image.src = url;
      this.textures.push(texture);
      return texture;
    }

    buildGlbModel(alatId) {
      const encoded = window.LAB_GLB_ASSETS && window.LAB_GLB_ASSETS[alatId];
      if (!encoded || typeof window.atob !== "function" && typeof atob !== "function") return false;
      try {
        const decode = window.atob || atob;
        const binary = decode(encoded);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
        const view = new DataView(bytes.buffer);
        if (view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2) return false;
        let offset = 12; let gltf = null; let bin = null;
        while (offset + 8 <= bytes.length) {
          const length = view.getUint32(offset, true);
          const type = view.getUint32(offset + 4, true);
          const chunk = bytes.slice(offset + 8, offset + 8 + length);
          if (type === 0x4e4f534a) gltf = JSON.parse(new TextDecoder().decode(chunk).trim());
          if (type === 0x004e4942) bin = chunk;
          offset += 8 + length;
        }
        if (!gltf || !bin) return false;

        const componentInfo = {
          5123: { Type: Uint16Array, bytes: 2 },
          5125: { Type: Uint32Array, bytes: 4 },
          5126: { Type: Float32Array, bytes: 4 }
        };
        const componentCount = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
        const readAccessor = (accessorIndex) => {
          const accessor = gltf.accessors[accessorIndex];
          const bufferView = gltf.bufferViews[accessor.bufferView];
          const info = componentInfo[accessor.componentType];
          const count = accessor.count * componentCount[accessor.type];
          const start = (bufferView.byteOffset || 0) + (accessor.byteOffset || 0);
          const copy = bin.buffer.slice(bin.byteOffset + start, bin.byteOffset + start + count * info.bytes);
          return new info.Type(copy);
        };
        const imageTextures = (gltf.images || []).map((image) => {
          const bufferView = gltf.bufferViews[image.bufferView];
          const start = bufferView.byteOffset || 0;
          return this.createTextureFromBytes(bin.slice(start, start + bufferView.byteLength), image.mimeType);
        });
        const gltfTextures = (gltf.textures || []).map((texture) => imageTextures[texture.source] || null);
        gltf.meshes.forEach((mesh, meshIndex) => {
          const primitive = mesh.primitives[0];
          const geometry = {
            positions: readAccessor(primitive.attributes.POSITION),
            normals: readAccessor(primitive.attributes.NORMAL),
            uvs: primitive.attributes.TEXCOORD_0 === undefined ? null : readAccessor(primitive.attributes.TEXCOORD_0),
            indices: readAccessor(primitive.indices)
          };
          this.meshes[`glb-${alatId}-${meshIndex}`] = uploadGeometry(this.gl, geometry);
        });
        (gltf.nodes || []).forEach((node) => {
          if (node.mesh === undefined) return;
          const extras = node.extras || {};
          const primitive = gltf.meshes[node.mesh].primitives[0];
          const material = (gltf.materials || [])[primitive.material] || {};
          const pbr = material.pbrMetallicRoughness || {};
          const factor = pbr.baseColorFactor || [0.7, 0.7, 0.7, 1];
          const textureIndex = pbr.baseColorTexture && pbr.baseColorTexture.index;
          const object = this.add(`glb-${alatId}-${node.mesh}`, extras.color || factor, {
            glass: extras.glass,
            visible: extras.visible !== false,
            role: extras.role || "",
            position: node.translation || [0, 0, 0],
            rotation: extras.rotation || [0, 0, 0],
            scale: node.scale || [1, 1, 1],
            effect: extras.effect || 0,
            effectStrength: extras.effectStrength || 0,
            texture: textureIndex === undefined ? null : gltfTextures[textureIndex],
            metallic: pbr.metallicFactor || 0,
            roughness: pbr.roughnessFactor === undefined ? 0.45 : pbr.roughnessFactor,
            data: extras.data || {}
          });
          object.alpha = factor[3] === undefined ? (extras.alpha === undefined ? 1 : extras.alpha) : factor[3];
        });
        this.usingGlb = true;
        return true;
      } catch (error) {
        console.warn("Model GLB tidak dapat dimuat; menggunakan model cadangan.", error);
        return false;
      }
    }

    buildEquipment(alatId) {
      const glass = [0.72, 0.94, 0.98, 0.27];
      const metal = [0.48, 0.54, 0.54, 1];
      const dark = [0.16, 0.21, 0.21, 1];
      const ceramic = [0.88, 0.87, 0.82, 1];
      const blue = [0.1, 0.56, 0.86, 0.8];
      const anchors = [[-2.5, 0.05, 0], [-0.1, 0.75, 0], [2.3, 0.1, 0]];
      switch (alatId) {
        case 1: { // Gelas ukur
          this.add("cylinder", [0.74, 0.87, 0.88, 0.78], { glass: true, position: [0, -1.34, 0], scale: [0.88, 0.13, 0.88] });
          this.add("box", [0.69, 0.83, 0.84, 0.74], { glass: true, position: [0, -1.4, 0], scale: [1.45, 0.08, 1.18] });
          this.add("graduatedCylinder", glass, { glass: true, position: [0, 0.3, 0], scale: [0.82, 3.35, 0.82] });
          this.add("torus", [0.86, 0.99, 1, 0.44], { glass: true, position: [0, 1.98, 0], scale: [0.5, 0.5, 0.5] });
          this.addGraduations(0, -1.14, 2.9, 0.5, 25, { majorWidth: 0.48, minorWidth: 0.28 });
          this.add("cylinder", blue, { role: "liquid", position: [0, -1.2, 0], scale: [0.43, 0.01, 0.43], data: { bottom: -1.2, maxHeight: 3.02, radius: 0.43 } });
          this.addLiquidSurface(0, -1.2, 3.02, 0.43, "liquid", { color: blue });
          this.add("box", [0.92, 0.52, 0.12, 0.95], { role: "targetMark", position: [0.03, 0.5, 0.53], scale: [0.62, 0.035, 0.025] });
          break;
        }
        case 2: { // Beaker
          this.addBeaker(0, -1.34, 1.35, 2.55, "liquid", blue);
          this.addParticles(30, [0, -0.8, 0], 1.05, "particle");
          this.add("cone", [0.22, 0.67, 0.9, 0.4], { role: "vortexCore", visible: false, effect: 1, position: [0, 0.35, 0], rotation: [Math.PI, 0, 0], scale: [0.72, 0.7, 0.72] });
          this.add("cylinder", glass, { glass: true, role: "stirringRod", position: [0.45, 0.25, 0.15], rotation: [0, 0, -0.25], scale: [0.07, 3.0, 0.07] });
          break;
        }
        case 3: { // Pipet untuk transfer
          this.addBeaker(-2.25, -1.34, 0.9, 1.7, "sourceLiquid", blue);
          this.addErlenmeyer(2.25, -1.34, 1.05, 1.25, 0.8, "destinationLiquid", [0.12, 0.64, 0.55, 0.8]);
          const pipetteAnchors = [[-2.25, 0.36, 0], [-0.15, 0.82, 0], [2.25, 0.58, 0]];
          const pipetteRotations = [0, 0.04, -0.08];
          this.addGroupPart("tube", glass, [0, 0.88, 0], { glass: true, anchors: pipetteAnchors, stageRotations: pipetteRotations, scale: [0.1, 1.36, 0.1] });
          this.addGroupPart("sphere", glass, [0, -0.05, 0], { glass: true, anchors: pipetteAnchors, stageRotations: pipetteRotations, scale: [0.38, 0.68, 0.38] });
          this.addGroupPart("tube", glass, [0, -1.05, 0], { glass: true, anchors: pipetteAnchors, stageRotations: pipetteRotations, scale: [0.1, 1.45, 0.1] });
          this.addGroupPart("cone", glass, [0, -1.98, 0], { glass: true, anchors: pipetteAnchors, stageRotations: pipetteRotations, rotation: [Math.PI, 0, 0], scale: [0.09, 0.48, 0.09] });
          this.addGroupPart("torus", dark, [0, 0.53, 0], { anchors: pipetteAnchors, stageRotations: pipetteRotations, scale: [0.108, 0.108, 0.108] });
          this.addGroupPart("sphere", [0.82, 0.16, 0.12, 1], [0, 1.93, 0], { anchors: pipetteAnchors, stageRotations: pipetteRotations, scale: [0.36, 0.52, 0.36], subRole: "pipetteFiller" });
          this.addGroupPart("cylinder", [0.08, 0.58, 0.88, 0.82], [0, -0.72, 0], {
            anchors: pipetteAnchors, stageRotations: pipetteRotations, scale: [0.068, 1.85, 0.068], subRole: "pipetteFluid"
          });
          this.addGroupPart("sphere", [0.08, 0.58, 0.88, 0.74], [0, -0.05, 0], {
            anchors: pipetteAnchors, stageRotations: pipetteRotations, scale: [0.31, 0.6, 0.31], subRole: "pipetteBulbFluid"
          });
          for (let index = 0; index < 8; index += 1) this.add("sphere", [0.1, 0.62, 0.9, 0.9], { role: "transferDrop", visible: false, position: [2.25, 0.5, 0], scale: [0.055, 0.075, 0.055], data: { index } });
          break;
        }
        case 4: { // Tabung reaksi dipanaskan
          const tubeAngle = -0.82;
          const tubePivot = [-0.45, 0.68, 0];
          const heatedPart = (mesh, color, position, options = {}) => this.add(mesh, color, {
            glass: options.glass, role: options.role || "heatedTubePart", position,
            rotation: options.rotation || [0, 0, tubeAngle], scale: options.scale || [1, 1, 1],
            data: { basePosition: position.slice(), baseRotation: (options.rotation || [0, 0, tubeAngle]).slice(), pivot: tubePivot.slice() }
          });
          heatedPart("testTube", glass, [0.59, 1.65, 0], { glass: true, scale: [0.34, 2.85, 0.34] });
          heatedPart("torus", [0.86, 0.99, 1, 0.44], [1.63, 2.62, 0], { glass: true, scale: [0.34, 0.34, 0.34] });
          heatedPart("cylinder", blue, [-0.14, 0.98, 0], { role: "heatedTubeLiquid", scale: [0.26, 0.78, 0.26] });
          heatedPart("sphere", [0.2, 0.67, 0.9, 0.8], [0.15, 1.24, 0], { role: "heatedTubeSurface", scale: [0.26, 0.04, 0.26] });
          // Penjepit ditempatkan pada sepertiga atas tabung, bukan di dekat dasar panas.
          heatedPart("box", [0.67, 0.42, 0.2, 1], [2.03, 2.17, 0.12], { rotation: [0, 0, 0.04], scale: [2.0, 0.15, 0.28] });
          heatedPart("box", [0.61, 0.36, 0.17, 1], [2.04, 1.91, -0.12], { rotation: [0, 0, -0.02], scale: [2.0, 0.14, 0.28] });
          heatedPart("cylinder", dark, [2.72, 2.04, 0], { rotation: [Math.PI / 2, 0, 0], scale: [0.13, 0.38, 0.13] });
          heatedPart("sphere", [0.58, 0.34, 0.15, 1], [1.04, 2.18, 0], { scale: [0.34, 0.19, 0.3] });
          heatedPart("sphere", [0.58, 0.34, 0.15, 1], [1.04, 1.9, 0], { scale: [0.34, 0.19, 0.3] });
          this.addBunsen(-0.22, -1.45, true);
          for (let index = 0; index < 14; index += 1) this.add("sphere", [0.86, 0.97, 1, 0.55], {
            role: "heatedTubeBubble", visible: false, position: [-0.14, 0.98, 0], scale: [0.055, 0.055, 0.055], data: { index, angle: tubeAngle, pivot: tubePivot.slice() }
          });
          for (let index = 0; index < 7; index += 1) this.add("sphere", [0.92, 0.96, 0.96, 0.22], {
            role: "heatedTubeSteam", visible: false, position: [1.63, 2.62, 0], scale: [0.16, 0.24, 0.16], data: { index, mouth: [1.63, 2.62, 0], pivot: tubePivot.slice() }
          });
          break;
        }
        case 5: { // Erlenmeyer
          const shakeStart = this.objects.length;
          this.addErlenmeyer(0, -1.35, 1.5, 1.95, 1.25, "liquid", [0.36, 0.31, 0.78, 0.78]);
          this.addParticles(28, [0, -0.85, 0], 1.05, "particle", [0.88, 0.28, 0.56, 0.9]);
          this.add("cone", [0.42, 0.34, 0.82, 0.38], { role: "vortexCore", visible: false, effect: 1, position: [0, -0.05, 0], rotation: [Math.PI, 0, 0], scale: [0.7, 0.55, 0.7] });
          this.objects.slice(shakeStart).forEach((object) => {
            object.data.shakeWithVessel = true;
            object.data.shakeRestPosition = object.position.slice();
            object.data.shakeRestRotation = object.rotation.slice();
            // Labu dipegang di leher; bagian badan bergerak melingkar di bawah tangan.
            object.data.shakePivot = [0, 1.38, 0];
          });
          break;
        }
        case 6: { // Kaca arloji
          this.addInstrumentBody(0, -1.42, 3.5, 0.82, 2.5, [0.78, 0.8, 0.76, 1]);
          this.add("cylinder", metal, { position: [0, -0.35, 0], scale: [1.25, 0.12, 1.25] });
          this.add("torus", glass, { glass: true, position: [0, -0.14, 0], scale: [1.2, 0.65, 1.2] });
          this.add("watchGlass", [0.78, 0.95, 0.98, 0.24], { glass: true, position: [0, -0.24, 0], scale: [1.15, 1, 1.15] });
          this.addSolidPile(0, -0.31, 0, 0.66, 0.2, [0.91, 0.84, 0.65, 1]);
          this.addParticles(24, [0, -0.31, 0], 0.62, "sampleParticle", [0.92, 0.87, 0.69, 1], { pileHeight: 0.2 });
          break;
        }
        case 7: { // Buret
          // Statif, batang, bosshead, dan rahang dibuat sebagai satu rangkaian tersambung.
          this.add("box", dark, { position: [-0.35, -1.38, 0], scale: [2.9, 0.16, 1.3] });
          this.add("cylinder", metal, { position: [-1.1, 0.65, 0], scale: [0.09, 4.05, 0.09] });
          this.add("tube", glass, { glass: true, position: [0.45, 0.82, 0], scale: [0.145, 3.55, 0.145] });
          this.add("torus", [0.86, 0.99, 1, 0.44], { glass: true, position: [0.45, 2.6, 0], scale: [0.145, 0.145, 0.145] });
          this.addGraduations(0.45, -0.72, 3.08, 0.145, 50, { majorWidth: 0.22, minorWidth: 0.12, z: 0.15 });
          this.add("cylinder", blue, { role: "buretteLiquid", position: [0.45, -0.62, 0], scale: [0.105, 0.01, 0.105], data: { bottom: -0.62, maxHeight: 3.0 } });
          this.add("sphere", blue, { role: "buretteSurface", position: [0.45, 2.38, 0], scale: [0.105, 0.035, 0.105], data: { bottom: -0.62, maxHeight: 3.0 } });
          // Dua rahang klem berlapis karet menahan buret tegak tanpa menutup skala.
          for (const y of [1.55, 0.05]) {
            this.add("cylinder", dark, { position: [-1.1, y, 0], scale: [0.16, 0.22, 0.16] });
            this.add("box", metal, { position: [-0.32, y, 0], scale: [1.55, 0.08, 0.09] });
            this.add("box", dark, { position: [0.32, y, 0.13], rotation: [0, -0.28, 0], scale: [0.34, 0.08, 0.12] });
            this.add("box", dark, { position: [0.32, y, -0.13], rotation: [0, 0.28, 0], scale: [0.34, 0.08, 0.12] });
          }
          this.add("cylinder", glass, { glass: true, position: [0.45, -0.88, 0], scale: [0.1, 0.42, 0.1] });
          this.add("cylinder", [0.85, 0.9, 0.88, 1], { position: [0.45, -0.83, 0], rotation: [0, 0, Math.PI / 2], scale: [0.16, 0.52, 0.16] });
          this.add("box", dark, { role: "stopcockHandle", position: [0.45, -0.83, 0.18], scale: [0.8, 0.11, 0.12] });
          this.add("cone", glass, { glass: true, position: [0.45, -0.96, 0], rotation: [Math.PI, 0, 0], scale: [0.1, 0.42, 0.1] });
          this.addErlenmeyer(0.45, -1.55, 0.64, 0.62, 0.34, "receiver", [0.64, 0.26, 0.73, 0.76]);
          for (let index = 0; index < 5; index += 1) this.add("sphere", [0.1, 0.58, 0.9, 0.88], {
            role: "drop", visible: false, position: [0.45, -1.16, 0], scale: [0.045, 0.085, 0.045], data: { index, topY: -1.16, fallDistance: 0.36 }
          });
          break;
        }
        case 8: { // Labu ukur
          const flaskColor = [0.1, 0.6, 0.87, 0.8];
          this.add("volumetricFlask", glass, { glass: true, position: [0, -0.04, 0], scale: [1.22, 1.28, 1.22] });
          this.add("tube", glass, { glass: true, position: [0, 1.55, 0], scale: [0.29, 1.9, 0.29] });
          this.add("torus", [0.85, 0.99, 1, 0.4], { glass: true, position: [0, 2.5, 0], scale: [0.29, 0.29, 0.29] });
          // Lapisan cairan mengikuti kurva bola; kolom terpisah mengisi leher hingga tanda batas.
          const bulbBottom = -1.12; const bulbTop = 0.56; const bulbCenter = -0.28; const bulbHalfHeight = 0.84;
          for (let index = 0; index < 16; index += 1) {
            const amount = (index + 0.5) / 16;
            const y = lerp(bulbBottom, bulbTop, amount);
            const normalizedY = (y - bulbCenter) / bulbHalfHeight;
            const layerRadius = 1.0 * Math.sqrt(Math.max(0.04, 1 - normalizedY * normalizedY));
            this.add("cylinder", flaskColor, {
              role: "volumetricLiquidLayer", visible: false, position: [0, y, 0], scale: [layerRadius, 0.108, layerRadius],
              data: { threshold: (index + 1) / 16 * 0.72 }
            });
          }
          this.add("cylinder", flaskColor, { role: "volumetricNeckLiquid", visible: false, position: [0, 0.72, 0], scale: [0.205, 0.01, 0.205], data: { bottom: 0.65, maxHeight: 1.02 } });
          this.add("sphere", flaskColor, { role: "volumetricLiquidSurface", visible: false, position: [0, bulbBottom, 0], scale: [0.16, 0.035, 0.16], data: { bulbBottom, bulbTop, bulbCenter, bulbHalfHeight, neckBottom: 0.65, neckHeight: 1.02 } });
          this.add("torus", [0.87, 0.35, 0.13, 0.96], { role: "targetMark", position: [0, 1.67, 0], scale: [0.292, 0.292, 0.292] });
          this.add("cone", [0.2, 0.28, 0.27, 1], { position: [0, 2.72, 0], scale: [0.34, 0.42, 0.34] });
          break;
        }
        case 9: { // Corong pisah
          this.addStand(-1.6);
          this.add("separator", glass, { glass: true, position: [0.35, 0.45, 0], scale: [1.15, 1.5, 1.15] });
          this.add("tube", glass, { glass: true, position: [0.35, -1.05, 0], scale: [0.18, 1.65, 0.18] });
          this.add("tube", glass, { glass: true, position: [0.35, 1.82, 0], scale: [0.35, 0.55, 0.35] });
          this.add("cone", dark, { position: [0.35, 2.2, 0], scale: [0.36, 0.48, 0.36] });
          this.add("cylinder", [0.16, 0.52, 0.86, 0.78], { role: "phaseBottom", position: [0.35, -0.22, 0], scale: [0.92, 1.15, 0.92] });
          this.add("cylinder", [0.92, 0.64, 0.13, 0.78], { role: "phaseTop", position: [0.35, 0.82, 0], scale: [0.92, 0.8, 0.92] });
          this.add("cylinder", metal, { position: [0.35, -1.34, 0], scale: [0.1, 0.3, 0.1] });
          this.add("box", [0.14, 0.2, 0.2, 1], { role: "stopcock", position: [0.35, -1.27, 0.03], scale: [0.68, 0.11, 0.12] });
          this.addParticles(22, [0.35, -0.25, 0], 0.82, "cloud");
          break;
        }
        case 10: { // Batang pengaduk
          this.addBeaker(0, -1.34, 1.3, 2.45, "liquid", blue);
          this.add("cylinder", glass, { glass: true, role: "stirringRod", position: [0.4, 0.4, 0.18], rotation: [0, 0, -0.28], scale: [0.075, 3.35, 0.075] });
          this.addParticles(30, [0, -0.8, 0], 1.02, "particle", [0.74, 0.34, 0.15, 0.95]);
          this.add("cone", [0.18, 0.63, 0.88, 0.42], { role: "vortexCore", visible: false, effect: 1, position: [0, 0.28, 0], rotation: [Math.PI, 0, 0], scale: [0.7, 0.7, 0.7] });
          break;
        }
        case 11: { // Desikator
          this.add("cylinder", [0.62, 0.67, 0.65, 1], { position: [0, -1.23, 0], scale: [1.85, 0.24, 1.85] });
          this.add("cylinder", glass, { glass: true, position: [0, -0.25, 0], scale: [1.78, 1.8, 1.78] });
          this.add("sphere", glass, { glass: true, position: [0, 0.72, 0], scale: [1.78, 1.05, 1.78] });
          this.add("torus", [0.83, 0.98, 1, 0.42], { glass: true, position: [0, 0.35, 0], scale: [1.78, 1.78, 1.78] });
          this.add("sphere", glass, { glass: true, position: [0, 1.72, 0], scale: [0.34, 0.34, 0.34] });
          this.add("cylinder", metal, { position: [0, -0.65, 0], scale: [1.45, 0.1, 1.45] });
          this.add("cylinder", [0.76, 0.57, 0.24, 1], { role: "sample", position: [0, -0.46, 0], scale: [0.9, 0.12, 0.9] });
          for (let index = 0; index < 20; index += 1) this.add("sphere", [0.2, 0.58, 0.87, 0.78], { role: "moisture", position: [0, -0.3, 0], scale: [0.075, 0.1, 0.075], data: { index } });
          break;
        }
        case 12: { // Neraca analitik
          this.addInstrumentBody(0, -1.42, 3.7, 0.72, 2.7, [0.76, 0.79, 0.76, 1]);
          this.add("cylinder", metal, { position: [0, -0.45, 0], scale: [1.05, 0.12, 1.05] });
          this.add("box", glass, { glass: true, position: [0, 0.65, -1.15], scale: [3.05, 2.05, 0.08] });
          this.add("box", glass, { glass: true, position: [-1.48, 0.65, 0], scale: [0.08, 2.05, 2.3] });
          this.add("box", glass, { glass: true, position: [1.48, 0.65, 0], scale: [0.08, 2.05, 2.3] });
          this.add("box", glass, { glass: true, position: [0, 1.68, 0], scale: [3.05, 0.08, 2.3] });
          this.add("box", glass, { glass: true, role: "balanceDoor", position: [-0.78, 0.65, 1.15], scale: [1.42, 2.0, 0.07], data: { openX: -0.78, closedX: 0 } });
          this.add("box", [0.34, 0.4, 0.39, 1], { position: [-1.5, 0.65, 1.2], scale: [0.08, 2.15, 0.08] });
          this.add("box", [0.34, 0.4, 0.39, 1], { position: [1.5, 0.65, 1.2], scale: [0.08, 2.15, 0.08] });
          this.add("box", [0.34, 0.4, 0.39, 1], { position: [0, 1.72, 1.2], scale: [3.08, 0.08, 0.08] });
          this.add("box", [0.22, 0.28, 0.28, 1], { role: "balanceHandle", position: [-0.16, 0.65, 1.24], scale: [0.08, 0.55, 0.08] });
          this.add("watchGlass", glass, { glass: true, position: [0, -0.3, 0], scale: [0.86, 0.8, 0.86] });
          this.addSolidPile(0, -0.38, 0, 0.53, 0.17, [0.91, 0.84, 0.66, 1]);
          this.addParticles(22, [0, -0.38, 0], 0.5, "sampleParticle", [0.92, 0.87, 0.7, 1], { pileHeight: 0.17 });
          break;
        }
        case 13: { // Termometer
          this.addBeaker(-0.6, -1.34, 1.08, 2.05, "liquid", [0.92, 0.42, 0.16, 0.72]);
          const thermometerX = -0.25;
          const thermometerAngle = -0.07;
          const thermometerPart = (mesh, color, position, options = {}) => this.add(mesh, color, {
            glass: options.glass, role: options.role || "thermometerPart", position,
            rotation: options.rotation || [0, 0, thermometerAngle], scale: options.scale || [1, 1, 1],
            data: Object.assign({ basePosition: position.slice(), baseRotation: (options.rotation || [0, 0, thermometerAngle]).slice(), lowerDistance: 0.92 }, options.data || {})
          });
          thermometerPart("tube", glass, [thermometerX, 1.77, 0.16], { glass: true, scale: [0.16, 3.15, 0.16] });
          thermometerPart("box", [0.94, 0.93, 0.86, 0.88], [thermometerX + 0.06, 1.77, 0.12], { scale: [0.16, 2.82, 0.055] });
          thermometerPart("sphere", [0.86, 0.08, 0.07, 0.98], [thermometerX - 0.11, 0.18, 0.16], { role: "thermometerBulb", scale: [0.17, 0.27, 0.17] });
          thermometerPart("cylinder", [0.86, 0.08, 0.07, 0.98], [thermometerX - 0.02, 0.43, 0.16], {
            role: "thermometerColumn", scale: [0.04, 0.12, 0.04], data: { bottom: 0.31, maxHeight: 2.25 }
          });
          for (let index = 0; index <= 20; index += 1) {
            const major = index % 5 === 0;
            thermometerPart("box", [0.11, 0.2, 0.21, 0.95], [thermometerX + (major ? 0.04 : 0.08), 0.28 + index * 0.115, 0.312], {
              rotation: [0, 0, thermometerAngle], scale: [major ? 0.22 : 0.13, major ? 0.022 : 0.014, 0.018]
            });
          }
          thermometerPart("sphere", [0.7, 0.08, 0.07, 1], [thermometerX + 0.12, 3.35, 0.16], { scale: [0.19, 0.14, 0.19] });
          break;
        }
        case 14: { // pH meter
          this.addBeaker(-1.35, -1.34, 0.75, 1.55, "liquid", [0.74, 0.25, 0.56, 0.78]);
          this.addBeaker(-2.75, -1.34, 0.58, 1.22, "bufferLiquid", [0.2, 0.62, 0.83, 0.7]);
          // Badan meter meja dengan panel miring, layar, dan tombol nyata.
          this.add("box", [0.73, 0.77, 0.75, 1], { position: [1.45, -0.86, 0], scale: [2.35, 0.95, 1.72] });
          this.add("box", [0.82, 0.85, 0.82, 1], { position: [1.45, 0.02, -0.22], rotation: [-0.2, 0, 0], scale: [2.1, 1.02, 1.22] });
          this.add("box", [0.06, 0.18, 0.18, 1], { role: "display", position: [1.45, 0.18, 0.48], rotation: [-0.2, 0, 0], scale: [1.28, 0.4, 0.045] });
          for (let index = 0; index < 4; index += 1) this.add("cylinder", [0.2, 0.27, 0.27, 1], { position: [0.92 + index * 0.36, -0.35, 0.91], rotation: [Math.PI / 2, 0, 0], scale: [0.1, 0.07, 0.1] });
          // Lengan penyangga elektroda dan kabel fleksibel bersegmen.
          this.add("cylinder", metal, { position: [0.18, 0.32, -0.35], scale: [0.08, 2.65, 0.08] });
          this.add("cylinder", metal, { role: "phProbeArm", position: [-0.35, 1.55, -0.35], rotation: [0, 0, Math.PI / 2], scale: [0.075, 1.05, 0.075], data: { pivot: [0.18, 1.55, -0.35] } });
          this.add("cylinder", dark, { role: "phProbeClamp", position: [-0.86, 1.55, -0.35], scale: [0.15, 0.22, 0.15] });
          const cablePoints = [[1.95,0.45], [1.45,1.12], [0.6,1.72], [-0.25,1.8], [-0.92,1.48]];
          for (let index = 0; index < cablePoints.length - 1; index += 1) {
            const from = cablePoints[index]; const to = cablePoints[index + 1];
            const dx = to[0] - from[0]; const dy = to[1] - from[1];
            this.add("cylinder", dark, { position: [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, -0.12], rotation: [0, 0, -Math.atan2(dx, dy)], scale: [0.045, Math.hypot(dx, dy), 0.045] });
          }
          this.add("cylinder", dark, { role: "phProbeCable", position: [-0.98, 1.56, -0.12], scale: [0.045, 0.25, 0.045], data: { anchor: [-0.92, 1.48, -0.12] } });
          this.add("cylinder", [0.3, 0.36, 0.35, 1], { role: "phProbe", position: [-1.02, 0.62, 0], scale: [0.12, 2.05, 0.12], data: { basePosition: [-1.02, 0.62, 0] } });
          this.add("cylinder", [0.77, 0.9, 0.91, 0.62], { glass: true, role: "phProbe", position: [-1.02, -0.47, 0], scale: [0.14, 0.3, 0.14], data: { basePosition: [-1.02, -0.47, 0] } });
          this.add("sphere", [0.72, 0.92, 0.95, 0.58], { glass: true, role: "phProbe", position: [-1.02, -0.75, 0], scale: [0.18, 0.27, 0.18], data: { basePosition: [-1.02, -0.75, 0] } });
          this.add("box", [0.52, 0.58, 0.56, 1], { role: "phProbe", position: [-0.88, -0.5, 0.14], scale: [0.05, 0.1, 0.025], data: { basePosition: [-0.88, -0.5, 0.14] } });
          break;
        }
        case 15: { // Spektrofotometer
          this.addInstrumentBody(0, -1.38, 4.1, 2.15, 2.65, [0.8, 0.82, 0.78, 1]);
          this.add("box", [0.72, 0.75, 0.72, 1], { position: [0.75, 0.22, 0.15], rotation: [-0.15, 0, 0], scale: [1.75, 0.65, 2.05] });
          this.add("box", dark, { position: [-0.9, 0.02, 0], scale: [1.35, 0.3, 1.35] });
          this.add("box", [0.3, 0.34, 0.33, 1], { role: "spectroLid", position: [-0.9, 0.42, -0.42], rotation: [-0.72, 0, 0], scale: [1.48, 0.12, 1.45] });
          this.add("box", glass, { glass: true, role: "cuvette", position: [-2.5, -0.72, 0.35], scale: [0.55, 1.25, 0.55] });
          this.add("box", [0.5, 0.22, 0.74, 0.78], { role: "cuvetteLiquid", position: [-2.5, -0.92, 0.35], scale: [0.46, 0.72, 0.46] });
          this.add("box", [1, 0.8, 0.12, 0.75], { role: "beam", position: [-0.9, 0.35, 0], scale: [2.8, 0.08, 0.08] });
          for (let index = 0; index < 4; index += 1) this.add("cylinder", [0.16, 0.2, 0.2, 1], { position: [0.28 + index * 0.38, -0.72, 1.38], rotation: [Math.PI / 2, 0, 0], scale: [0.09, 0.07, 0.09] });
          break;
        }
        case 16: { // Pipet tetes
          this.addPipette(0, 0.45, "dropper", "pipetteLiquid");
          this.addBeaker(0, -1.48, 1.0, 1.05, "receiver", [0.62, 0.83, 0.92, 0.58]);
          this.addDroplets(0, -1.42, 5);
          break;
        }
        case 17: { // Pipet volume
          this.addPipette(0, 0.15, "volume", "pipetteLiquid");
          this.addErlenmeyer(0, -1.48, 0.8, 0.92, 0.5, "receiver", [0.62, 0.83, 0.92, 0.58]);
          break;
        }
        case 18: { // Pipet ukur
          this.addPipette(0, 0.15, "measure", "pipetteLiquid");
          this.addErlenmeyer(0, -1.48, 0.8, 0.92, 0.5, "receiver", [0.62, 0.83, 0.92, 0.58]);
          break;
        }
        case 19: { // Pembakar Bunsen
          this.addBunsen(0, -1.42, true);
          const hose = [[0.78,-0.94], [1.28,-1.03], [1.85,-0.88], [2.35,-0.5]];
          for (let index = 0; index < hose.length - 1; index += 1) {
            const from = hose[index]; const to = hose[index + 1]; const dx = to[0] - from[0]; const dy = to[1] - from[1];
            this.add("cylinder", [0.055, 0.08, 0.08, 1], { position: [(from[0]+to[0])/2, (from[1]+to[1])/2, 0], rotation: [0, 0, -Math.atan2(dx, dy)], scale: [0.1, Math.hypot(dx, dy), 0.1] });
          }
          break;
        }
        case 20: { // Hotplate stirrer
          this.add("box", [0.25, 0.31, 0.31, 1], { position: [0, -1.15, 0], scale: [3.45, 0.62, 2.6] });
          this.add("cylinder", ceramic, { role: "hotplateGlow", position: [0, -0.77, 0], scale: [1.45, 0.12, 1.45] });
          this.add("cylinder", dark, { position: [-0.7, -1.1, 1.34], rotation: [Math.PI / 2, 0, 0], scale: [0.18, 0.12, 0.18] });
          this.add("cylinder", dark, { position: [0.7, -1.1, 1.34], rotation: [Math.PI / 2, 0, 0], scale: [0.18, 0.12, 0.18] });
          this.addBeaker(0, -0.68, 1.18, 2.05, "liquid", blue);
          this.add("cylinder", [0.72, 0.76, 0.75, 1], { role: "stirbar", position: [0, -0.48, 0], rotation: [0, 0, Math.PI / 2], scale: [0.1, 0.72, 0.1] });
          this.addParticles(26, [0, -0.32, 0], 0.9, "particle");
          this.add("cone", [0.18, 0.64, 0.9, 0.44], { role: "vortexCore", visible: false, effect: 1, position: [0, 0.62, 0], rotation: [Math.PI, 0, 0], scale: [0.78, 0.84, 0.78] });
          break;
        }
        case 21: { // Mantel pemanas
          this.add("cone", [0.28, 0.31, 0.29, 1], { position: [0, -0.65, 0], scale: [1.7, 1.45, 1.7] });
          this.add("torus", [0.92, 0.42, 0.12, 0.72], { role: "mantleGlow", position: [0, -0.02, 0], scale: [1.28, 1.28, 1.28] });
          this.addRoundFlask(0, -0.65, 1.18, 1.35, "liquid", blue);
          this.add("box", dark, { position: [2.05, -0.95, 0], scale: [1.4, 0.75, 1.1] });
          this.add("cylinder", [0.85, 0.32, 0.1, 1], { position: [2.05, -0.9, 0.58], rotation: [Math.PI / 2, 0, 0], scale: [0.18, 0.1, 0.18] });
          this.addHeatingEffects(0, -0.45, 0.82, 2.25);
          break;
        }
        case 22: { // Penjepit kayu
          this.addBunsen(2.1, -1.42, true);
          const clampAnchors = [[-2.2, 1.05, 0], [-0.25, 1.4, 0], [0.95, 1.72, 0]];
          const clampRotations = [0, -0.14, -0.58];
          // Pegangan panjang berada di belakang pivot; rahang pendek mencengkeram bagian atas tabung.
          this.addGroupPart("box", [0.69, 0.44, 0.22, 1], [-0.55, 0.2, 0], { anchors: clampAnchors, stageRotations: clampRotations, scale: [2.7, 0.18, 0.32], subRole: "woodArm", jawSide: 1 });
          this.addGroupPart("box", [0.62, 0.37, 0.17, 1], [-0.55, -0.2, 0], { anchors: clampAnchors, stageRotations: clampRotations, scale: [2.7, 0.18, 0.32], subRole: "woodArm", jawSide: -1 });
          this.addGroupPart("cylinder", dark, [0.32, 0, 0], { anchors: clampAnchors, stageRotations: clampRotations, rotation: [Math.PI / 2, 0, 0], scale: [0.15, 0.42, 0.15], subRole: "woodPivot" });
          this.addGroupPart("torus", [0.45, 0.48, 0.46, 1], [0.18, 0, 0], { anchors: clampAnchors, stageRotations: clampRotations, rotation: [Math.PI / 2, 0, 0], scale: [0.28, 0.28, 0.28], subRole: "woodSpring" });
          this.addGroupPart("sphere", [0.56, 0.32, 0.14, 1], [1.28, 0.23, 0], { anchors: clampAnchors, stageRotations: clampRotations, scale: [0.45, 0.21, 0.34], subRole: "woodJaw", jawSide: 1 });
          this.addGroupPart("sphere", [0.56, 0.32, 0.14, 1], [1.28, -0.23, 0], { anchors: clampAnchors, stageRotations: clampRotations, scale: [0.45, 0.21, 0.34], subRole: "woodJaw", jawSide: -1 });
          this.addGroupPart("testTube", glass, [1.48, -0.55, 0], { glass: true, anchors: clampAnchors, stageRotations: clampRotations, scale: [0.3, 2.5, 0.3], subRole: "heldTestTube" });
          this.addGroupPart("torus", [0.86, 0.99, 1, 0.44], [1.48, 0.7, 0], { glass: true, anchors: clampAnchors, stageRotations: clampRotations, scale: [0.3, 0.3, 0.3], subRole: "heldTestTube" });
          this.addGroupPart("cylinder", [0.18, 0.56, 0.86, 0.78], [1.48, -1.1, 0], { anchors: clampAnchors, stageRotations: clampRotations, scale: [0.23, 0.62, 0.23], subRole: "heldTubeLiquid" });
          this.add("sphere", [1, 0.25, 0.06, 0.22], { role: "hotGlow", position: [2.05, 0.5, 0], scale: [0.62, 0.62, 0.62] });
          break;
        }
        case 23: { // Tang krus
          this.add("box", [0.24, 0.28, 0.27, 1], { position: [2.3, -1.28, 0], scale: [2.0, 0.18, 1.6] });
          this.addGroupPart("cylinder", metal, [-0.65, 0.18, 0], { anchors, rotation: [0, 0, 1.06], scale: [0.11, 2.7, 0.11] });
          this.addGroupPart("cylinder", metal, [-0.65, -0.18, 0], { anchors, rotation: [0, 0, 2.08], scale: [0.11, 2.7, 0.11] });
          this.addGroupPart("cylinder", dark, [0, 0, 0], { anchors, rotation: [Math.PI / 2, 0, 0], scale: [0.14, 0.35, 0.14] });
          this.addGroupPart("torus", metal, [-1.82, 0.72, 0], { anchors, rotation: [Math.PI / 2, 0, 0], scale: [0.28, 0.22, 0.18] });
          this.addGroupPart("torus", metal, [-1.82, -0.72, 0], { anchors, rotation: [Math.PI / 2, 0, 0], scale: [0.28, 0.22, 0.18] });
          this.addGroupPart("sphere", metal, [0.72, 0.27, 0], { anchors, scale: [0.2, 0.12, 0.16] });
          this.addGroupPart("sphere", metal, [0.72, -0.27, 0], { anchors, scale: [0.2, 0.12, 0.16] });
          this.addGroupPart("crucible", ceramic, [1.0, 0, 0], { anchors, scale: [0.62, 0.65, 0.62] });
          this.addGroupPart("cylinder", ceramic, [1.0, 0.42, 0], { anchors, scale: [0.5, 0.1, 0.5] });
          this.add("sphere", [1, 0.25, 0.06, 0.2], { role: "hotGlow", position: [-1.5, 0.1, 0], scale: [0.72, 0.72, 0.72] });
          break;
        }
        case 24: { // Centrifuge
          this.add("box", [0.72, 0.75, 0.72, 1], { position: [0, -1.08, 0], scale: [4.1, 0.72, 3.2] });
          this.add("cylinder", [0.52, 0.56, 0.55, 1], { position: [0, -0.35, 0], scale: [1.95, 0.65, 1.95] });
          this.add("cylinder", [0.18, 0.22, 0.22, 1], { role: "rotor", position: [0, 0.15, 0], scale: [1.62, 0.22, 1.62], data: { angle: 0 } });
          this.add("cylinder", glass, { glass: true, role: "centrifugeLid", position: [0, 0.82, -1.5], rotation: [Math.PI / 2, 0, 0], scale: [1.85, 0.12, 1.85] });
          for (let index = 0; index < 6; index += 1) {
            const angle = index / 6 * TAU;
            this.add("tube", glass, { glass: true, role: "centrifugeTube", position: [Math.cos(angle) * 1.15, 0.02, Math.sin(angle) * 1.15], rotation: [0.32, 0, -angle], scale: [0.2, 0.9, 0.2], data: { index, angle } });
            this.add("cylinder", [0.25, 0.55, 0.82, 0.82], { role: "tubeLiquid", position: [Math.cos(angle) * 1.15, -0.15, Math.sin(angle) * 1.15], rotation: [0.32, 0, -angle], scale: [0.15, 0.5, 0.15], data: { index, angle } });
            this.add("sphere", [0.78, 0.42, 0.16, 0.95], { role: "pellet", position: [Math.cos(angle) * 1.15, -0.42, Math.sin(angle) * 1.15], scale: [0.13, 0.045, 0.13], data: { index, angle } });
          }
          this.add("box", dark, { role: "display", position: [1.2, -0.98, 1.64], scale: [1.05, 0.32, 0.05] });
          break;
        }
        case 25: { // Spatula
          this.add("cylinder", [0.66, 0.72, 0.7, 1], { position: [-2.25, -0.55, 0], scale: [0.78, 1.55, 0.78] });
          this.add("torus", [0.72, 0.78, 0.76, 1], { position: [-2.25, 0.22, 0], scale: [0.78, 0.78, 0.78] });
          this.add("cylinder", dark, { role: "reagentLid", position: [-3.05, -1.15, 0], rotation: [0, 0, Math.PI / 2], scale: [0.42, 0.2, 0.42] });
          this.add("torus", glass, { glass: true, position: [2.3, -1.12, 0], scale: [1.0, 0.48, 1.0] });
          this.add("watchGlass", glass, { glass: true, position: [2.3, -1.2, 0], scale: [0.95, 0.8, 0.95] });
          this.addSolidPile(-2.25, -1.22, 0, 0.58, 0.34, [0.72, 0.38, 0.13, 1], "sourceSolidMound");
          this.addSolidPile(2.3, -1.3, 0, 0.68, 0.19, [0.72, 0.38, 0.13, 1], "destinationSolidMound");
          const spatulaAnchors = [[-3.58, 0.2, 0], [-1.4, 0.78, 0], [0.9, -0.4, 0]];
          const spatulaRotations = [0.08, 0.02, -0.22];
          this.addGroupPart("cylinder", metal, [0, 0, 0], { anchors: spatulaAnchors, stageRotations: spatulaRotations, rotation: [0, 0, Math.PI / 2], scale: [0.075, 2.25, 0.075], subRole: "spatulaHandle" });
          this.addGroupPart("box", metal, [1.42, 0, 0], { anchors: spatulaAnchors, stageRotations: spatulaRotations, scale: [0.78, 0.07, 0.32], subRole: "spatulaBlade" });
          this.addGroupPart("watchGlass", metal, [-1.34, 0, 0], { anchors: spatulaAnchors, stageRotations: spatulaRotations, rotation: [0, 0, Math.PI / 2], scale: [0.42, 0.18, 0.26], subRole: "spatulaScoop" });
          for (let index = 0; index < 22; index += 1) this.add("sphere", [0.74, 0.42, 0.16, 0.96], {
            role: "solidTransferParticle", position: [-2.25, -0.72, 0], scale: [0.07, 0.07, 0.07], data: { index, anchors: spatulaAnchors, stageRotations: spatulaRotations }
          });
          break;
        }
        case 26: { // Statif dan klem
          this.add("box", dark, { position: [1.5, -1.32, 0], scale: [2.45, 0.18, 1.55] });
          this.add("cylinder", metal, { position: [1.0, 0.1, 0], scale: [0.09, 2.9, 0.09] });
          this.add("box", metal, { position: [1.25, 0.75, 0], scale: [1.15, 0.1, 0.1] });
          this.add("cylinder", dark, { position: [1.0, 0.75, 0], scale: [0.18, 0.22, 0.18] });
          this.add("box", metal, { position: [1.83, 0.75, -0.14], rotation: [0, 0.25, 0], scale: [0.7, 0.08, 0.12] });
          this.add("box", metal, { position: [1.83, 0.75, 0.14], rotation: [0, -0.25, 0], scale: [0.7, 0.08, 0.12] });
          const mountAnchors = [[-2.55, 0.1, 0], [-0.4, 0.75, 0], [1.85, 0.35, 0]];
          this.addGroupPart("tube", glass, [0, 0, 0], { glass: true, anchors: mountAnchors, scale: [0.18, 3.2, 0.18] });
          this.addGroupPart("cone", glass, [0, -1.82, 0], { glass: true, anchors: mountAnchors, rotation: [Math.PI, 0, 0], scale: [0.14, 0.42, 0.14] });
          this.addGroupPart("box", dark, [0, -1.52, 0], { anchors: mountAnchors, scale: [0.62, 0.09, 0.12] });
          break;
        }
        case 27: { // Rak tabung reaksi
          this.add("box", [0.55, 0.33, 0.15, 1], { position: [1.2, -1.2, 0], scale: [3.4, 0.18, 1.65] });
          this.add("box", [0.67, 0.44, 0.22, 1], { position: [1.2, -0.15, 0], scale: [3.4, 0.18, 1.65] });
          this.add("box", [0.58, 0.36, 0.16, 1], { position: [-0.42, -0.65, 0], scale: [0.16, 1.25, 1.65] });
          this.add("box", [0.58, 0.36, 0.16, 1], { position: [2.82, -0.65, 0], scale: [0.16, 1.25, 1.65] });
          for (let index = 0; index < 4; index += 1) {
            const x = -0.05 + index * 0.82;
            this.add("torus", dark, { position: [x, -0.04, 0], scale: [0.28, 0.28, 0.28] });
            if (index > 0) this.addTestTube(x, -1.02, 1.95, 0.25, "", [0.22 + index * 0.12, 0.55, 0.8, 0.72]);
          }
          const rackAnchors = [[-2.5, -0.15, 0], [-0.45, 0.55, 0], [-0.05, -0.02, 0]];
          this.addGroupPart("tube", glass, [0, 0, 0], { glass: true, anchors: rackAnchors, scale: [0.25, 1.95, 0.25] });
          this.addGroupPart("sphere", glass, [0, -0.98, 0], { glass: true, anchors: rackAnchors, scale: [0.25, 0.22, 0.25] });
          break;
        }
        case 28: { // Simbol keselamatan
          this.add("cylinder", [0.48, 0.57, 0.55, 1], { position: [-1.65, -0.35, 0], scale: [0.78, 1.72, 0.78] });
          this.add("cylinder", dark, { position: [-1.65, 0.62, 0], scale: [0.6, 0.3, 0.6] });
          this.add("box", [0.94, 0.94, 0.9, 1], { position: [-1.65, -0.22, 0.8], rotation: [0, 0, Math.PI / 4], scale: [1.0, 1.0, 0.05] });
          this.add("box", [0.82, 0.08, 0.07, 1], { position: [-1.65, -0.22, 0.84], rotation: [0, 0, Math.PI / 4], scale: [0.82, 0.08, 0.03] });
          this.add("cone", dark, { position: [-1.65, -0.22, 0.89], rotation: [0, 0, Math.PI], scale: [0.22, 0.5, 0.12] });
          this.addMannequin(1.25);
          this.add("box", [0.18, 0.67, 0.52, 0.82], { role: "ppe", visible: false, position: [1.25, 0, 0.45], scale: [1.75, 2.6, 0.28] });
          this.add("box", [0.13, 0.44, 0.72, 0.78], { role: "goggles", visible: false, position: [1.25, 1.72, 0.54], scale: [1.18, 0.34, 0.18] });
          this.add("sphere", [0.16, 0.68, 0.53, 0.82], { role: "gloveLeft", visible: false, position: [0.05, -1.02, 0], scale: [0.32, 0.45, 0.28] });
          this.add("sphere", [0.16, 0.68, 0.53, 0.82], { role: "gloveRight", visible: false, position: [2.45, -1.02, 0], scale: [0.32, 0.45, 0.28] });
          break;
        }
        case 29: case 30: case 31: { // APD
          this.addMannequin(0);
          const coat = [0.94, 0.96, 0.95, 0.98];
          this.add("box", coat, { role: "ppe", visible: false, position: [0, -0.02, 0.38], scale: [1.58, 2.48, 0.58] });
          this.add("cylinder", coat, { role: "ppe", visible: false, position: [-1.02, 0.02, 0.38], rotation: [0, 0, -0.13], scale: [0.31, 2.12, 0.31] });
          this.add("cylinder", coat, { role: "ppe", visible: false, position: [1.02, 0.02, 0.38], rotation: [0, 0, 0.13], scale: [0.31, 2.12, 0.31] });
          this.add("box", [0.79, 0.83, 0.82, 1], { role: "ppe", visible: false, position: [-0.28, 0.68, 0.71], rotation: [0, 0, -0.28], scale: [0.22, 0.9, 0.07] });
          this.add("box", [0.79, 0.83, 0.82, 1], { role: "ppe", visible: false, position: [0.28, 0.68, 0.71], rotation: [0, 0, 0.28], scale: [0.22, 0.9, 0.07] });
          this.add("box", [0.84, 0.87, 0.86, 1], { role: "ppe", visible: false, position: [-0.43, -0.68, 0.71], scale: [0.5, 0.42, 0.08] });
          this.add("box", [0.84, 0.87, 0.86, 1], { role: "ppe", visible: false, position: [0.43, -0.68, 0.71], scale: [0.5, 0.42, 0.08] });
          for (let index = 0; index < 5; index += 1) this.add("sphere", [0.28, 0.34, 0.34, 1], { role: "ppe", visible: false, position: [0, 0.47 - index * 0.34, 0.74], scale: [0.055, 0.055, 0.045] });

          for (const x of [-0.29, 0.29]) {
            this.add("sphere", [0.45, 0.78, 0.91, 0.34], { glass: true, role: "goggles", visible: false, position: [x, 1.72, 0.58], scale: [0.34, 0.23, 0.11] });
            this.add("torus", [0.12, 0.29, 0.4, 0.96], { role: "goggles", visible: false, position: [x, 1.72, 0.59], rotation: [Math.PI / 2, 0, 0], scale: [0.33, 0.27, 0.2] });
          }
          this.add("box", [0.12, 0.29, 0.4, 0.96], { role: "goggles", visible: false, position: [0, 1.72, 0.6], scale: [0.28, 0.055, 0.055] });
          this.add("torus", [0.12, 0.29, 0.4, 0.9], { role: "goggles", visible: false, position: [0, 1.72, 0.06], rotation: [Math.PI / 2, 0, 0], scale: [0.62, 0.5, 0.46] });

          for (const [side, role] of [[-1, "gloveLeft"], [1, "gloveRight"]]) {
            const handX = side * 1.2;
            this.add("sphere", [0.1, 0.58, 0.72, 0.96], { role, visible: false, position: [handX, -1.02, 0.05], scale: [0.36, 0.43, 0.28] });
            for (let finger = 0; finger < 4; finger += 1) this.add("cylinder", [0.1, 0.58, 0.72, 0.96], {
              role, visible: false, position: [handX + side * (finger - 1.5) * 0.09, -1.38, 0.05], scale: [0.055, 0.42 - finger * 0.025, 0.055]
            });
            this.add("cylinder", [0.1, 0.58, 0.72, 0.96], { role, visible: false, position: [handX + side * 0.35, -1.04, 0.06], rotation: [0, 0, side * 0.7], scale: [0.07, 0.35, 0.07] });
          }
          break;
        }
        case 32: { // Mortar dan alu
          this.add("mortar", [0.75, 0.72, 0.65, 1], { position: [0, -0.86, 0], scale: [1.65, 1.5, 1.65] });
          this.add("torus", [0.88, 0.85, 0.78, 1], { position: [0, -0.35, 0], scale: [1.55, 1.55, 1.55] });
          this.add("cylinder", [0.23, 0.21, 0.18, 1], { role: "pestle", position: [0.4, 0.25, 0], rotation: [0, 0, -0.48], scale: [0.27, 2.35, 0.27] });
          this.add("sphere", [0.23, 0.21, 0.18, 1], { role: "pestle", position: [-0.12, -0.78, 0], scale: [0.34, 0.4, 0.34] });
          this.addSolidPile(0, -1.25, 0, 0.95, 0.34, [0.7, 0.36, 0.13, 1], "mortarPowderPile");
          this.addParticles(32, [0, -1.12, 0], 0.92, "grain", [0.74, 0.42, 0.18, 1]);
          break;
        }
        case 33: { // Kawat kasa dan tripod
          this.addBunsen(0, -1.48, false);
          for (let index = 0; index < 3; index += 1) this.add("cylinder", metal, { position: [(index - 1) * 0.78, -0.55, index === 1 ? 0.6 : -0.25], rotation: [0, 0, (index - 1) * 0.38], scale: [0.08, 1.55, 0.08] });
          this.add("box", [0.38, 0.41, 0.39, 1], { position: [0, 0.42, 0], scale: [2.65, 0.08, 2.65] });
          for (let index = -5; index <= 5; index += 1) {
            this.add("box", [0.68, 0.7, 0.66, 1], { position: [index * 0.23, 0.47, 0], scale: [0.025, 0.025, 2.5] });
            this.add("box", [0.68, 0.7, 0.66, 1], { position: [0, 0.48, index * 0.23], scale: [2.5, 0.025, 0.025] });
          }
          this.addBeaker(0, 0.52, 1.1, 1.85, "liquid", blue);
          for (let index = 0; index < 3; index += 1) this.add("cone", [1, 0.36, 0.08, 0.86], { role: "flame", effect: 2, effectStrength: 1, position: [(index - 1) * 0.22, -0.12, 0], scale: [0.22, 0.82, 0.22], data: { index } });
          this.addHeatingEffects(0, 0.68, 0.8, 2.55);
          break;
        }
        default: return false;
      }
      return true;
    }

    build() {
      this.add("box", [0.47, 0.67, 0.61, 1], { position: [0, -1.55, 0], scale: [10, 0.25, 6] });
      this.add("box", [0.78, 0.91, 0.87, 1], { position: [0, 2.4, -2.8], scale: [10, 7.7, 0.2] });
      this.add("sphere", [0.04, 0.09, 0.08, 0.16], { position: [0, -1.405, 0.15], scale: [2.5, 0.035, 1.5] });
      const preset = this.options.preset;
      const mode = this.options.mode;

      if (this.buildGlbModel(Number(this.options.alatId))) return;
      if (this.buildEquipment(Number(this.options.alatId))) return;

      if (["volume", "pipette", "burette", "drops"].includes(preset)) this.buildVolume(preset);
      else if (["solution", "titration", "vortex", "grinding"].includes(preset)) this.buildMix(preset);
      else if (["heated-liquid", "flame", "even-heating"].includes(preset)) this.buildHeat(preset);
      else if (["separation", "drying", "centrifuge"].includes(preset)) this.buildProcess(preset);
      else if (["mass", "temperature", "ph", "absorbance"].includes(preset)) this.buildMeasure(preset);
      else if (mode === "transfer") this.buildTransfer(preset);
      else if (mode === "safety") this.buildSafety(preset);
      else this.buildMix("solution");
    }

    buildVolume(preset) {
      if (preset === "burette") {
        this.addStand(0.35);
        this.addGlassVessel(0.35, 0.22, 4.0, -0.8, [0.08, 0.58, 0.88, 0.84], "liquid");
        this.add("cylinder", [0.28, 0.34, 0.33, 1], { position: [0.35, -1.02, 0], scale: [0.08, 0.44, 0.08] });
        this.add("box", [0.15, 0.19, 0.18, 1], { position: [0.35, -0.91, 0], scale: [0.65, 0.1, 0.1] });
        this.addGlassVessel(0.35, 0.8, 1.0, -1.42, [0.63, 0.24, 0.72, 0.74], "receiver", "cone");
        for (let index = 0; index < 4; index += 1) this.add("sphere", [0.1, 0.58, 0.9, 0.86], { role: "drop", visible: false, position: [0.35, -1.05 - index * 0.2, 0], scale: [0.06, 0.1, 0.06], data: { index } });
      } else if (preset === "pipette" || preset === "drops") {
        const radius = preset === "drops" ? 0.18 : 0.24;
        this.addGlassVessel(0, radius, 3.4, -0.9, [0.1, 0.58, 0.88, 0.85], "liquid");
        this.add("sphere", preset === "drops" ? [0.12, 0.36, 0.31, 1] : [0.76, 0.92, 0.95, 0.38], { glass: preset !== "drops", position: [0, 2.05, 0], scale: [0.48, 0.62, 0.48] });
        this.addGlassVessel(0, 0.9, 1.2, -1.42, [0.62, 0.83, 0.92, 0.62], "receiver", "cone");
        for (let index = 0; index < 5; index += 1) this.add("sphere", [0.12, 0.6, 0.9, 0.88], { role: "drop", visible: false, position: [0, -1 - index * 0.18, 0], scale: [0.055, 0.09, 0.055], data: { index } });
      } else {
        this.addGlassVessel(0, 1.15, 3.3, -1.35, [0.08, 0.62, 0.88, 0.82], "liquid");
        this.add("box", [0.91, 0.55, 0.17, 0.9], { role: "targetMark", position: [0, 0.65, 1.15], scale: [1.38, 0.035, 0.035] });
      }
    }

    buildMix(preset) {
      if (preset === "grinding") {
        this.add("cylinder", [0.7, 0.66, 0.58, 1], { position: [0, -0.92, 0], scale: [1.55, 0.65, 1.55] });
        this.add("cylinder", [0.28, 0.24, 0.19, 1], { role: "pestle", position: [0.4, 0.15, 0], rotation: [0, 0, -0.48], scale: [0.25, 2.35, 0.25] });
        this.addSolidPile(0, -1.15, 0, 0.95, 0.32, [0.7, 0.36, 0.13, 1], "mortarPowderPile");
        this.addParticles(32, [0, -1.04, 0], 0.92, "grain", [0.74, 0.42, 0.18, 1]);
        return;
      }
      const shape = preset === "titration" ? "cone" : "cylinder";
      this.addGlassVessel(0, 1.35, 2.9, -1.35, [0.17, 0.55, 0.85, 0.78], "liquid", shape);
      this.add("cylinder", [0.7, 0.74, 0.75, 0.92], { role: "stirbar", position: [0, -1.08, 0], rotation: [0, 0, Math.PI / 2], scale: [0.11, 0.75, 0.11] });
      this.addParticles(30, [0, -0.78, 0], 1.05, "particle");
      if (preset === "vortex") this.add("box", [0.14, 0.22, 0.21, 1], { position: [0, -1.48, 0], scale: [3.3, 0.28, 2.7] });
    }

    buildHeat(preset) {
      if (preset === "flame") {
        this.add("cylinder", [0.22, 0.28, 0.27, 1], { position: [0, -0.7, 0], scale: [0.8, 0.25, 0.8] });
        this.add("cylinder", [0.36, 0.43, 0.42, 1], { position: [0, 0.25, 0], scale: [0.36, 1.8, 0.36] });
        this.add("cone", [1, 0.55, 0.08, 0.88], { role: "flameOuter", position: [0, 1.75, 0], scale: [0.75, 2.05, 0.75] });
        this.add("cone", [1, 0.93, 0.36, 0.92], { role: "flameInner", position: [0, 1.45, 0], scale: [0.34, 1.25, 0.34] });
        return;
      }
      this.addGlassVessel(0, 1.35, 2.7, -0.95, [0.08, 0.52, 0.83, 0.8], "liquid", preset === "heated-liquid" ? "cone" : "cylinder");
      this.add("box", [0.18, 0.24, 0.23, 1], { position: [0, -1.28, 0], scale: [3.2, 0.18, 2.4] });
      for (let index = 0; index < 3; index += 1) this.add("cone", [1, 0.35, 0.08, 0.84], { role: "flame", position: [(index - 1) * 0.48, -0.78, 0], scale: [0.3, 0.9, 0.3], data: { index } });
      for (let index = 0; index < 18; index += 1) this.add("sphere", [0.86, 0.97, 1, 0.55], { role: "bubble", visible: false, position: [0, -0.5, 0], scale: [0.08, 0.08, 0.08], data: { index } });
      for (let index = 0; index < 9; index += 1) this.add("sphere", [0.92, 0.96, 0.96, 0.22], { role: "steam", visible: false, position: [0, 2.0, 0], scale: [0.2, 0.3, 0.2], data: { index } });
    }

    buildProcess(preset) {
      if (preset === "separation") {
        this.add("sphere", [0.72, 0.94, 0.96, 0.28], { glass: true, position: [0, 0.2, 0], scale: [1.35, 1.75, 1.35] });
        this.add("cylinder", [0.76, 0.95, 0.97, 0.3], { glass: true, position: [0, -1.15, 0], scale: [0.18, 1.45, 0.18] });
        this.add("cylinder", [0.16, 0.52, 0.86, 0.78], { role: "phaseBottom", position: [0, -0.28, 0], scale: [1.16, 1.25, 1.16] });
        this.add("cylinder", [0.92, 0.64, 0.13, 0.78], { role: "phaseTop", position: [0, 0.82, 0], scale: [1.16, 0.95, 1.16] });
        this.addParticles(24, [0, -0.3, 0], 1.05, "cloud");
      } else if (preset === "drying") {
        this.add("sphere", [0.72, 0.94, 0.96, 0.26], { glass: true, position: [0, 0.05, 0], scale: [2.0, 1.7, 2.0] });
        this.add("cylinder", [0.42, 0.46, 0.43, 1], { position: [0, -1.2, 0], scale: [2.0, 0.25, 2.0] });
        this.add("cylinder", [0.77, 0.58, 0.25, 1], { role: "sample", position: [0, -0.82, 0], scale: [1.15, 0.15, 1.15] });
        for (let index = 0; index < 18; index += 1) this.add("sphere", [0.18, 0.6, 0.88, 0.72], { role: "moisture", position: [0, -0.45, 0], scale: [0.08, 0.12, 0.08], data: { index } });
      } else {
        this.add("cylinder", [0.12, 0.22, 0.21, 1], { position: [0, -0.55, 0], scale: [2.2, 1.5, 2.2] });
        this.add("cylinder", [0.35, 0.3, 0.52, 1], { role: "rotor", position: [0, 0.55, 0], scale: [1.75, 0.25, 1.75] });
        for (let index = 0; index < 6; index += 1) {
          const angle = index / 6 * TAU;
          this.add("tube", [0.76, 0.94, 0.97, 0.42], { glass: true, role: "centrifugeTube", position: [Math.cos(angle) * 1.2, 0.42, Math.sin(angle) * 1.2], rotation: [0.36, 0, -angle], scale: [0.22, 1.05, 0.22], data: { index, angle } });
          this.add("cylinder", [0.25, 0.55, 0.82, 0.82], { role: "tubeLiquid", position: [Math.cos(angle) * 1.2, 0.2, Math.sin(angle) * 1.2], rotation: [0.36, 0, -angle], scale: [0.17, 0.58, 0.17], data: { index, angle } });
        }
      }
    }

    buildMeasure(preset) {
      if (preset === "mass") {
        this.add("box", [0.2, 0.25, 0.24, 1], { position: [0, -0.75, 0], scale: [3.6, 1.1, 2.7] });
        this.add("cylinder", [0.65, 0.69, 0.68, 1], { position: [0, 0.02, 0], scale: [1.25, 0.15, 1.25] });
        this.addSolidPile(0, 0.09, 0, 0.75, 0.2, [0.91, 0.84, 0.66, 1]);
        this.addParticles(28, [0, 0.09, 0], 0.72, "sampleParticle", [0.92, 0.87, 0.7, 1], { pileHeight: 0.2 });
        this.add("box", [0.08, 0.16, 0.14, 1], { role: "display", position: [0, -0.69, 1.37], scale: [1.5, 0.48, 0.08] });
      } else {
        this.add("box", [0.19, 0.25, 0.24, 1], { position: [1.65, -0.35, 0], scale: [2.2, 2.1, 1.5] });
        this.add("box", [0.08, 0.15, 0.14, 1], { role: "display", position: [1.65, 0.05, 0.78], scale: [1.55, 0.65, 0.08] });
        this.addGlassVessel(-0.75, 1.05, 2.0, -1.32, preset === "ph" ? [0.76, 0.26, 0.56, 0.8] : [0.12, 0.58, 0.86, 0.8], "liquid");
        if (preset === "temperature" || preset === "ph") this.add("cylinder", [0.22, 0.3, 0.29, 1], { role: "probe", position: [-0.55, 0.45, 0], rotation: [0, 0, -0.13], scale: [0.09, 2.7, 0.09] });
        if (preset === "absorbance") this.add("box", [1, 0.8, 0.12, 0.75], { role: "beam", position: [-0.8, -0.25, 0], scale: [3.2, 0.08, 0.08] });
      }
    }

    buildTransfer(preset) {
      if (preset === "mounting") {
        this.addStand(2.1);
        this.add("cylinder", [0.74, 0.94, 0.96, 0.34], { glass: true, role: "tool", position: [-2.3, -0.05, 0], rotation: [0, 0, Math.PI / 2], scale: [0.22, 3.5, 0.22] });
      } else {
        this.addGlassVessel(-2.35, 1.0, 2.1, -1.3, preset === "solid-transfer" ? [0.72, 0.41, 0.16, 0.92] : [0.1, 0.56, 0.86, 0.82], "sourceLiquid");
        this.addGlassVessel(2.35, 1.0, 2.1, -1.3, [0.12, 0.63, 0.56, 0.82], "destinationLiquid");
        this.add("cylinder", preset === "hot-transfer" ? [0.34, 0.36, 0.35, 1] : [0.7, 0.76, 0.74, 1], { role: "tool", position: [-3.7, 0.25, 0], rotation: [0, 0, Math.PI / 2], scale: [0.14, 2.45, 0.14] });
        if (preset === "hot-transfer") this.add("sphere", [1, 0.25, 0.06, 0.22], { role: "hotGlow", position: [-2.35, -0.15, 0], scale: [1.35, 1.35, 1.35] });
      }
    }

    buildSafety(preset) {
      this.add("sphere", [0.82, 0.63, 0.48, 1], { position: [0, 1.65, 0], scale: [0.58, 0.68, 0.58] });
      this.add("cylinder", [0.19, 0.44, 0.68, 1], { position: [0, -0.05, 0], scale: [0.85, 2.55, 0.62] });
      this.add("cylinder", [0.82, 0.63, 0.48, 1], { position: [-1.05, -0.08, 0], rotation: [0, 0, -0.1], scale: [0.18, 2.0, 0.18] });
      this.add("cylinder", [0.82, 0.63, 0.48, 1], { position: [1.05, -0.08, 0], rotation: [0, 0, 0.1], scale: [0.18, 2.0, 0.18] });
      this.add("box", preset === "hazard" ? [0.86, 0.15, 0.13, 0.6] : [0.18, 0.67, 0.52, 0.82], { role: "ppe", visible: false, position: [0, 0, 0.45], scale: [1.75, 2.6, 0.28] });
      this.add("box", [0.13, 0.44, 0.72, 0.78], { role: "goggles", visible: false, position: [0, 1.72, 0.54], scale: [1.18, 0.34, 0.18] });
      this.add("sphere", [0.16, 0.68, 0.53, 0.82], { role: "gloveLeft", visible: false, position: [-1.2, -1.02, 0], scale: [0.32, 0.45, 0.28] });
      this.add("sphere", [0.16, 0.68, 0.53, 0.82], { role: "gloveRight", visible: false, position: [1.2, -1.02, 0], scale: [0.32, 0.45, 0.28] });
    }

    setFill(object, ratio) {
      const value = clamp(ratio);
      const height = object.data.maxHeight * value;
      object.scale[1] = Math.max(0.006, height);
      object.position[1] = object.data.bottom + height / 2;
      object.visible = value > 0.003;
    }

    update(state, config, transformasi, timestamp = performance.now()) {
      const mode = config.mode;
      const preset = transformasi.preset;
      const progress = state.done ? 1 : mode === "level"
        ? clamp(state.value / Math.max(1, config.target))
        : mode === "heat"
          ? clamp((state.value - 25) / Math.max(1, config.target - 25))
          : ["mix", "process"].includes(mode)
            ? clamp(state.progress / Math.max(1, config.target))
            : mode === "measure"
              ? clamp((state.measureProgress || 0) / 100)
              : mode === "transfer" ? state.transferStage / 2 : state.done ? 1 : 0;
      const time = timestamp / 1000;
      const transferEase = state.transferAnimating
        ? state.transferMotion * state.transferMotion * (3 - 2 * state.transferMotion)
        : 0;
      const transferPosition = (state.transferStage || 0) + transferEase;
      const alatId = Number(this.options.alatId);
      const airPower = clamp(Number(state.power || 0) / 100);
      const burnerAir = alatId === 4 || alatId === 22 ? 0.88 : airPower;
      this.time = time;
      this.progress = progress;

      this.objects.forEach((object) => {
        if (object.data.shakeWithVessel) {
          object.position = object.data.shakeRestPosition.slice();
          object.rotation = object.data.shakeRestRotation.slice();
        }
        if (object.role === "liquid") {
          if (mode === "level") this.setFill(object, state.placed ? state.value / Math.max(1, config.max) : 0);
          else this.setFill(object, state.placed ? (preset === "separation" ? 0.65 : 0.67) : 0.04);
          if (["solution", "titration", "vortex"].includes(preset)) object.color = colorMix([0.12, 0.42, 0.86], [0.3, 0.72, 0.57], progress);
          if (["heated-liquid", "even-heating"].includes(preset)) object.color = colorMix([0.08, 0.52, 0.83], [0.94, 0.34, 0.12], progress);
        }
        if (object.role === "bufferLiquid") this.setFill(object, 0.72);
        if (object.role === "pipetteLiquid") {
          const ratio = state.placed ? clamp(state.value / Math.max(1, config.max)) : 0.03;
          this.setFill(object, ratio);
        }
        if (object.role === "pipetteBulbFluid") {
          const ratio = state.placed ? clamp(state.value / Math.max(1, config.max)) : 0;
          const bulbFill = clamp((ratio - 0.26) / 0.34);
          object.visible = bulbFill > 0.02;
          object.scale[1] = object.data.baseScale[1] * Math.max(0.05, bulbFill);
          object.position[1] = (object.data.centerY || object.position[1]);
        }
        if (object.role === "buretteLiquid") {
          const delivered = state.placed ? clamp(state.value / Math.max(1, config.max)) : 0;
          this.setFill(object, state.placed ? lerp(0.96, 0.08, delivered) : 0.04);
        }
        if (object.role === "buretteSurface") {
          const delivered = state.placed ? clamp(state.value / Math.max(1, config.max)) : 0;
          const remaining = state.placed ? lerp(0.96, 0.08, delivered) : 0.04;
          object.visible = remaining > 0.02;
          object.position[1] = object.data.bottom + object.data.maxHeight * remaining;
        }
        if (object.role === "volumetricLiquidLayer") {
          const ratio = state.placed ? clamp(state.value / Math.max(1, config.max)) : 0;
          object.visible = ratio + 0.002 >= object.data.threshold;
        }
        if (object.role === "volumetricNeckLiquid") {
          const ratio = state.placed ? clamp(state.value / Math.max(1, config.max)) : 0;
          const neckFill = clamp((ratio - 0.72) / 0.113);
          const height = object.data.maxHeight * neckFill;
          object.visible = neckFill > 0.005;
          object.scale[1] = Math.max(0.006, height);
          object.position[1] = object.data.bottom + height / 2;
        }
        if (object.role === "volumetricLiquidSurface") {
          const ratio = state.placed ? clamp(state.value / Math.max(1, config.max)) : 0;
          object.visible = ratio > 0.005;
          if (ratio <= 0.72) {
            const bulbFill = clamp(ratio / 0.72);
            const surfaceY = lerp(object.data.bulbBottom, object.data.bulbTop, bulbFill);
            const normalizedY = (surfaceY - object.data.bulbCenter) / object.data.bulbHalfHeight;
            const radius = Math.sqrt(Math.max(0.025, 1 - normalizedY * normalizedY));
            object.position[1] = surfaceY;
            object.scale[0] = radius; object.scale[2] = radius;
          } else {
            const neckFill = clamp((ratio - 0.72) / 0.113);
            object.position[1] = object.data.neckBottom + object.data.neckHeight * neckFill;
            object.scale[0] = 0.205; object.scale[2] = 0.205;
          }
        }
        if (object.role === "liquidSurface") {
          let fill = 0;
          if (object.data.sourceRole === "sourceLiquid") {
            fill = transferPosition <= 1 ? lerp(0.78, 0.32, transferPosition) : lerp(0.32, 0.05, transferPosition - 1);
          } else if (object.data.sourceRole === "destinationLiquid") {
            fill = transferPosition <= 1 ? 0.03 : lerp(0.03, 0.76, transferPosition - 1);
          } else if (object.data.sourceRole === "receiver") {
            fill = preset === "burette"
              ? (state.placed ? lerp(0.08, 0.76, state.value / Math.max(1, config.max)) : 0.04)
              : preset === "drops" ? (state.placed ? lerp(0.06, 0.54, state.value / Math.max(1, config.max)) : 0.04) : 0.18;
          } else if (object.data.sourceRole === "bufferLiquid") {
            fill = 0.72;
          } else if (mode === "level") {
            fill = state.placed ? state.value / Math.max(1, config.max) : 0;
          } else {
            fill = state.placed ? (preset === "separation" ? 0.65 : 0.67) : 0.04;
          }
          const value = clamp(fill);
          const changingRadius = lerp(object.data.bottomRadius, object.data.topRadius, value);
          object.visible = value > 0.025;
          object.position[1] = object.data.bottom + object.data.maxHeight * value;
          object.scale[0] = changingRadius;
          object.scale[2] = changingRadius;
          object.rotation[1] = time * 0.18;
          object.effectStrength = (state.running ? 1.35 : 0.35) + progress * 0.35;
          if (["solution", "titration", "vortex"].includes(preset)) object.color = colorMix([0.12, 0.42, 0.86], [0.3, 0.72, 0.57], progress);
          if (["heated-liquid", "even-heating"].includes(preset)) object.color = colorMix([0.08, 0.52, 0.83], [0.94, 0.34, 0.12], progress);
        }
        if (object.role === "receiver") {
          const receiverFill = preset === "burette"
            ? (state.placed ? lerp(0.08, 0.76, state.value / Math.max(1, config.max)) : 0.04)
            : preset === "drops" ? (state.placed ? lerp(0.06, 0.54, state.value / Math.max(1, config.max)) : 0.04)
              : 0.18;
          this.setFill(object, receiverFill);
        }
        if (object.role === "drop") {
          object.visible = state.placed && state.value > 0 && !state.done;
          const topY = object.data.topY === undefined ? -0.95 : object.data.topY;
          object.position[1] = topY - ((time * 1.8 + object.data.index * 0.23) % 1) * (object.data.fallDistance || 0.85);
        }
        if (object.role === "particle") {
          const angle = object.data.baseAngle + state.phase * 0.75;
          const radius = lerp(object.data.radius, object.data.radius * 0.72, progress);
          object.position[0] = Math.cos(angle) * radius;
          object.position[2] = Math.sin(angle) * radius;
          object.position[1] = lerp(-0.85 + (object.data.index % 4) * 0.04, -0.55 + ((object.data.index * 17) % 16) / 16 * 1.45, progress);
          object.scale = [lerp(0.1, 0.035, progress), lerp(0.1, 0.035, progress), lerp(0.1, 0.035, progress)];
          object.alpha = lerp(0.94, 0.2, progress);
        }
        if (object.role === "stirbar") object.rotation[1] = state.phase * 2.6;
        if (object.role === "stirringRod") object.rotation[2] = -0.26 + Math.sin(state.phase * 0.7) * 0.1;
        if (object.role === "vortexCore") {
          const strength = clamp((state.power || 0) / 100) * progress;
          object.visible = state.running && strength > 0.04;
          object.rotation[1] = state.phase * 2.2;
          object.scale[0] = lerp(0.28, 0.82, strength);
          object.scale[2] = object.scale[0];
          object.scale[1] = lerp(0.18, 0.92, strength);
          object.alpha = lerp(0.16, 0.48, strength);
          object.effectStrength = 0.6 + strength;
        }
        if (object.role === "grain") {
          const size = lerp(0.17, 0.045, progress);
          const angle = object.data.baseAngle + state.phase * 0.32;
          const radius = lerp(object.data.radius, object.data.radius * 0.68, progress);
          const pileBase = alatId === 32 ? -1.25 : -1.15;
          const pileRadius = 0.95 * lerp(1, 0.7, progress);
          const pileHeight = (alatId === 32 ? 0.34 : 0.32) * lerp(1, 0.42, progress);
          const pileSurface = pileBase + pileHeight * clamp((1 - radius / pileRadius) / 0.55);
          object.visible = state.placed;
          object.position[0] = Math.cos(angle) * radius;
          object.position[2] = Math.sin(angle) * radius;
          object.position[1] = pileSurface + size * 0.88 + (object.data.index % 3) * size * 0.16;
          object.scale = [size, size, size];
        }
        if (object.role === "mortarPowderPile") {
          object.visible = state.placed;
          const compact = lerp(1, 0.7, progress);
          object.scale[0] = object.data.baseScale[0] * compact;
          object.scale[1] = object.data.baseScale[1] * lerp(1, 0.42, progress);
          object.scale[2] = object.data.baseScale[2] * compact;
          object.position[1] = object.data.surfaceY + object.scale[1] / 2;
        }
        if (object.role === "pestle") object.rotation[2] = -0.48 + Math.sin(state.phase * 1.8) * 0.18;
        if (object.role === "flameOuter") {
          object.color = colorMix([1, 0.55, 0.08], [0.08, 0.38, 1], burnerAir);
          object.scale[0] = lerp(0.72, 0.38, burnerAir); object.scale[2] = object.scale[0];
          object.scale[1] = lerp(1.16, 1.55, burnerAir) + Math.sin(time * 9) * 0.055;
        }
        if (object.role === "flameInner") {
          object.color = colorMix([1, 0.94, 0.4], [0.52, 0.86, 1], burnerAir);
          object.scale[1] = lerp(0.64, 0.88, burnerAir) + Math.sin(time * 10.5) * 0.025;
        }
        if (object.role === "airCollar") object.rotation[1] = burnerAir * Math.PI * 0.72;
        if (object.role === "airHole") {
          object.color = colorMix([0.28, 0.31, 0.31], [0.025, 0.045, 0.05], burnerAir);
          object.scale[1] = lerp(0.015, 0.08, burnerAir);
        }
        if (object.role === "gasValve") object.rotation[0] = airPower * Math.PI * 0.28;
        if (object.role === "flame") {
          object.visible = state.running || progress > 0;
          object.scale[1] = 0.78 + Math.sin(time * 10 + object.data.index) * 0.12;
        }
        if (object.role === "bubble") {
          const activeCount = Math.round(progress * 18);
          object.visible = state.placed && object.data.index < activeCount;
          const angle = object.data.index * 2.39;
          const rise = (time * (0.5 + progress) + object.data.index * 0.13) % 1;
          const centerX = object.data.centerX || 0;
          const bottom = object.data.bottom === undefined ? -0.65 : object.data.bottom;
          const radius = object.data.radius || 1;
          object.position = [centerX + Math.cos(angle) * radius * (0.22 + (object.data.index % 5) * 0.11), bottom + rise * 1.55, Math.sin(angle) * radius * (0.22 + (object.data.index % 5) * 0.11)];
        }
        if (object.role === "steam") {
          object.visible = progress > 0.24;
          const rise = (time * 0.24 + object.data.index / 9) % 1;
          const centerX = object.data.centerX || 0;
          const steamY = object.data.steamY === undefined ? 1.55 : object.data.steamY;
          object.position = [centerX + Math.sin(object.data.index * 2.1 + time) * 0.65, steamY + rise * 1.5, Math.cos(object.data.index * 1.7) * 0.35];
          const size = 0.16 + rise * 0.32; object.scale = [size, size * 1.4, size]; object.alpha = (1 - rise) * progress * 0.32;
        }
        if (object.role === "heatedTubePart" || object.role === "heatedTubeLiquid" || object.role === "heatedTubeSurface") {
          const active = state.placed && (state.running || progress > 0);
          const sweep = active ? Math.sin(time * 2.4) * 0.075 : 0;
          const pivot = object.data.pivot; const base = object.data.basePosition;
          const dx = base[0] - pivot[0]; const dy = base[1] - pivot[1];
          const cos = Math.cos(sweep); const sin = Math.sin(sweep);
          object.position[0] = pivot[0] + dx * cos - dy * sin;
          object.position[1] = pivot[1] + dx * sin + dy * cos;
          object.rotation[2] = object.data.baseRotation[2] + sweep;
          if (object.role === "heatedTubeLiquid" || object.role === "heatedTubeSurface") {
            object.visible = state.placed;
            object.color = colorMix([0.08, 0.52, 0.83], [0.94, 0.34, 0.12], progress);
          }
        }
        if (object.role === "heatedTubeBubble") {
          const activeCount = Math.round(progress * 14);
          object.visible = state.placed && object.data.index < activeCount;
          const rise = (time * (0.45 + progress) + object.data.index * 0.17) % 1;
          const sweep = state.running ? Math.sin(time * 2.4) * 0.075 : 0;
          const angle = object.data.angle + sweep;
          const along = 0.18 + rise * 0.66;
          const across = (object.data.index % 5 - 2) * 0.042;
          const axisX = -Math.sin(angle); const axisY = Math.cos(angle);
          const sideX = Math.cos(angle); const sideY = Math.sin(angle);
          const pivot = object.data.pivot;
          object.position = [
            pivot[0] + axisX * along + sideX * across,
            pivot[1] + axisY * along + sideY * across,
            Math.sin(object.data.index * 2.3) * 0.1
          ];
        }
        if (object.role === "heatedTubeSteam") {
          object.visible = progress > 0.28;
          const rise = (time * 0.24 + object.data.index / 7) % 1;
          const sweep = state.running ? Math.sin(time * 2.4) * 0.075 : 0;
          const pivot = object.data.pivot; const mouth = object.data.mouth;
          const dx = mouth[0] - pivot[0]; const dy = mouth[1] - pivot[1];
          const cos = Math.cos(sweep); const sin = Math.sin(sweep);
          const mouthX = pivot[0] + dx * cos - dy * sin;
          const mouthY = pivot[1] + dx * sin + dy * cos;
          object.position = [mouthX + Math.sin(time + object.data.index) * 0.15 + rise * 0.12, mouthY + rise * 0.92, Math.cos(object.data.index * 1.8) * 0.14];
          const size = 0.12 + rise * 0.24; object.scale = [size, size * 1.35, size]; object.alpha = (1 - rise) * progress * 0.3;
        }
        if (object.role === "cloud") {
          object.visible = progress < 0.9;
          object.alpha = 0.7 * (1 - progress);
          object.position[1] = -0.55 + ((object.data.index * 17) % 19) / 19 * 1.8;
        }
        if (object.role === "phaseBottom") { object.scale[1] = lerp(1.45, 1.05, progress); object.position[1] = lerp(-0.12, -0.42, progress); }
        if (object.role === "phaseTop") { object.scale[1] = lerp(1.1, 0.82, progress); object.position[1] = lerp(0.46, 1.02, progress); }
        if (object.role === "moisture") {
          object.visible = object.data.index / 18 > progress;
          const rise = (time * 0.25 + object.data.index / 18) % 1;
          object.position = [Math.cos(object.data.index * 2.3) * 1.15, -0.5 + rise * 2.0, Math.sin(object.data.index * 2.3) * 1.15];
        }
        if (["rotor", "centrifugeTube", "tubeLiquid", "pellet"].includes(object.role)) {
          const spin = clamp((state.power || 0) / 100) * (state.running ? 1 : state.done ? 0.32 : 0);
          const angle = (object.data.angle || 0) + state.phase * (1.8 + spin * 3.8);
          const swing = lerp(0.16, 0.72, spin);
          const radius = lerp(1.02, 1.34, spin);
          if (object.role === "rotor") object.rotation[1] = state.phase * (1.8 + spin * 3.8);
          else {
            object.position[0] = Math.cos(angle) * radius; object.position[2] = Math.sin(angle) * radius;
            object.rotation[1] = -angle;
            object.rotation[0] = swing;
            object.rotation[2] = 0;
            if (object.role === "tubeLiquid") object.color = colorMix([0.25, 0.55, 0.82], [0.75, 0.88, 0.94], progress);
            if (object.role === "pellet") {
              object.visible = progress > 0.18;
              const pelletSize = lerp(0.02, 0.16, progress);
              object.scale = [pelletSize, pelletSize * 0.32, pelletSize];
              object.position[1] = lerp(-0.1, -0.46, progress);
            }
          }
        }
        if (object.role === "centrifugeLid") {
          const closed = state.placed || state.running || state.done;
          object.rotation[0] = lerp(Math.PI / 2, 0.08, closed ? 1 : 0);
          object.position[1] = closed ? 0.62 : 0.82;
          object.position[2] = closed ? 0 : -1.5;
        }
        if (object.role === "sampleParticle" || object.role === "solidPile") object.visible = state.placed;
        if (object.role === "display") object.color = state.done ? [0.5, 0.9, 0.2] : state.measuring ? [0.96, 0.72, 0.12] : [0.08, 0.15, 0.14];
        if (object.role === "beam") object.visible = state.placed && (state.measuring || state.done);
        if (object.role === "balanceDoor" || object.role === "balanceHandle") {
          const close = state.done ? 1 : state.measuring ? clamp((state.measureProgress || 0) / 18) : 0;
          object.position[0] = object.role === "balanceDoor" ? lerp(-0.78, 0, close) : lerp(-0.16, 0.62, close);
        }
        if (object.role === "cuvette" || object.role === "cuvetteLiquid") {
          const insertion = state.done ? 1 : state.measuring ? lerp(0.62, 1, clamp((state.measureProgress || 0) / 20)) : state.placed ? 0.62 : 0;
          object.position[0] = lerp(-2.5, -0.9, insertion);
          object.position[2] = lerp(0.35, 0, insertion);
          object.position[1] = object.role === "cuvette" ? lerp(-0.72, 0.38, insertion) : lerp(-0.92, 0.18, insertion);
        }
        if (object.role === "spectroLid") {
          const close = state.done ? 1 : state.measuring ? clamp((state.measureProgress || 0) / 20) : 0;
          object.rotation[0] = lerp(-0.72, 0, close);
          object.position[2] = lerp(-0.42, 0, close);
        }
        if (object.role === "thermometerPart" || object.role === "thermometerBulb") {
          const placement = state.placed ? 1 : 0;
          object.position[1] = object.data.basePosition[1] - object.data.lowerDistance * placement;
          object.position[0] = object.data.basePosition[0];
          object.rotation[2] = object.data.baseRotation[2] + (state.measuring ? Math.sin(time * 3) * 0.008 : 0);
        }
        if (object.role === "thermometerColumn") {
          const placement = state.placed ? 1 : 0;
          const columnProgress = state.placed ? lerp(0.24, 0.84, progress) : 0.08;
          const height = object.data.maxHeight * columnProgress;
          object.scale[1] = Math.max(0.06, height);
          object.position[1] = object.data.bottom - object.data.lowerDistance * placement + height / 2;
          object.rotation[2] = object.data.baseRotation[2];
        }
        if (object.role === "phProbe") {
          // Urutan visual: berada di buffer saat kalibrasi, terangkat setelah dibilas,
          // lalu turun ke sampel tanpa menyentuh dasar beaker.
          const base = object.data.basePosition;
          const inBuffer = !state.calibrated;
          const targetX = inBuffer ? -2.68 : -1.32;
          const lift = !inBuffer && !state.placed ? 1.1 : 0;
          object.position[0] = targetX + (base[0] + 1.02);
          object.position[1] = base[1] + lift + (state.measuring ? Math.sin(time * 3.2) * 0.01 : 0);
        }
        if (object.role === "phProbeArm" || object.role === "phProbeClamp" || object.role === "phProbeCable") {
          const inBuffer = !state.calibrated;
          const targetX = inBuffer ? -2.68 : -1.32;
          const lift = !inBuffer && !state.placed ? 1.1 : 0;
          const clampY = 1.55 + lift;
          if (object.role === "phProbeArm") {
            const pivot = object.data.pivot;
            const dx = targetX - pivot[0]; const dy = clampY - pivot[1];
            object.position = [(pivot[0] + targetX) / 2, (pivot[1] + clampY) / 2, -0.2];
            object.rotation[2] = -Math.atan2(dx, dy);
            object.scale[1] = Math.hypot(dx, dy);
          } else if (object.role === "phProbeClamp") {
            object.position = [targetX, clampY, -0.12];
          } else {
            const anchor = object.data.anchor;
            const cableTargetY = clampY + 0.08;
            const dx = targetX - anchor[0]; const dy = cableTargetY - anchor[1];
            object.position = [(anchor[0] + targetX) / 2, (anchor[1] + cableTargetY) / 2, -0.12];
            object.rotation[2] = -Math.atan2(dx, dy);
            object.scale[1] = Math.hypot(dx, dy);
          }
        }
        if (object.role === "stopcock") object.rotation[1] = state.value > 0 || progress > 0 ? Math.PI / 2 : 0;
        if (object.role === "stopcockHandle") object.rotation[2] = state.value > 0 ? Math.PI / 2 : 0;
        if (object.role === "dropperBulb") {
          const pulse = state.placed && state.value > 0 ? Math.abs(Math.sin(time * 5.5)) : 0;
          const base = object.data.baseScale;
          object.scale = [base[0] * (1 + pulse * 0.16), base[1] * (1 - pulse * 0.28), base[2] * (1 + pulse * 0.16)];
        }
        if (object.role === "dropperTipDrop") {
          object.visible = state.placed && state.value > 0 && !state.done;
          const pulse = (time * 2.4) % 1;
          object.scale[1] = lerp(0.04, 0.16, pulse);
          object.position[1] = lerp(0.45 - 1.87, 0.45 - 2.03, pulse);
        }
        if (object.role === "hotplateGlow" || object.role === "mantleGlow") {
          object.color = colorMix([0.88, 0.87, 0.82], [1, 0.28, 0.04], progress);
          object.alpha = lerp(0.7, 0.95, progress);
        }
        if (object.role === "sourceLiquid") {
          const fill = transferPosition <= 1 ? lerp(0.78, 0.32, transferPosition) : lerp(0.32, 0.05, transferPosition - 1);
          this.setFill(object, fill);
        }
        if (object.role === "destinationLiquid") {
          const fill = transferPosition <= 1 ? 0.03 : lerp(0.03, 0.76, transferPosition - 1);
          this.setFill(object, fill);
        }
        if (object.role === "tool") {
          const stage = state.transferStage || 0;
          object.position[0] = stage === 0 ? -3.7 : stage === 1 ? -0.2 : 2.35;
          object.position[1] = stage === 1 ? 0.7 : 0.25;
          object.rotation[2] = stage === 1 ? -0.28 : Math.PI / 2;
        }
        if (object.role === "toolPart") {
          const fromStage = Math.min(2, Math.floor(transferPosition));
          const toStage = Math.min(2, Math.ceil(transferPosition));
          const amount = transferPosition - fromStage;
          const fromAnchor = object.data.anchors[fromStage];
          const toAnchor = object.data.anchors[toStage];
          const anchor = [lerp(fromAnchor[0], toAnchor[0], amount), lerp(fromAnchor[1], toAnchor[1], amount), lerp(fromAnchor[2], toAnchor[2], amount)];
          const local = object.data.localPosition.slice();
          const stageRotations = object.data.stageRotations || [0, -0.28, 0];
          const groupRotation = lerp(stageRotations[fromStage], stageRotations[toStage], amount);
          let localRotationOffset = 0;
          if (object.data.subRole === "woodArm" || object.data.subRole === "woodJaw") {
            const openness = 1 - clamp(transferPosition / 0.82);
            local[1] += object.data.jawSide * openness * (object.data.subRole === "woodJaw" ? 0.22 : 0.1);
            localRotationOffset = object.data.jawSide * openness * 0.1;
          }
          const cos = Math.cos(groupRotation); const sin = Math.sin(groupRotation);
          object.position[0] = anchor[0] + local[0] * cos - local[1] * sin;
          object.position[1] = anchor[1] + local[0] * sin + local[1] * cos;
          object.position[2] = anchor[2] + local[2];
          object.rotation[0] = object.data.localRotation[0];
          object.rotation[1] = object.data.localRotation[1];
          object.rotation[2] = object.data.localRotation[2] + groupRotation + localRotationOffset;
          if (object.data.subRole === "pipetteFluid" || object.data.subRole === "pipetteBulbFluid") {
            const fill = transferPosition <= 1 ? clamp(transferPosition) : clamp(2 - transferPosition);
            object.visible = fill > 0.03;
            const effectiveFill = object.data.subRole === "pipetteBulbFluid" ? clamp((fill - 0.24) / 0.36) : fill;
            object.visible = effectiveFill > 0.03;
            object.scale[1] = object.data.baseScale[1] * Math.max(0.04, effectiveFill);
          }
          if (object.data.subRole === "pipetteFiller") {
            const squeeze = state.transferAnimating && state.transferTargetStage === 1 ? Math.sin(clamp(state.transferMotion) * Math.PI) : 0;
            object.scale[0] = object.data.baseScale[0] * (1 + squeeze * 0.13);
            object.scale[1] = object.data.baseScale[1] * (1 - squeeze * 0.24);
            object.scale[2] = object.data.baseScale[2] * (1 + squeeze * 0.13);
          }
        }
        if (object.role === "pourStream") {
          const pouring = state.transferAnimating && state.transferTargetStage === 2 && state.transferMotion > 0.52;
          object.visible = pouring;
          const stream = clamp((state.transferMotion - 0.52) / 0.22);
          object.scale[0] = 0.035 + Math.sin(time * 18) * 0.006;
          object.scale[2] = object.scale[0];
          object.scale[1] = lerp(0.15, 1.25, stream);
          object.position[1] = 0.55 - object.scale[1] / 2;
        }
        if (object.role === "transferDrop") {
          const pouring = state.transferAnimating && state.transferTargetStage === 2 && state.transferMotion > 0.5;
          object.visible = pouring;
          const fall = (time * 2.8 + object.data.index * 0.14) % 1;
          object.position[1] = 0.55 - fall * 1.65;
          object.position[0] = 2.25 + Math.sin(object.data.index * 2.4) * 0.035;
          object.scale[1] = 0.05 + fall * 0.08;
        }
        if (object.role === "solidTransferParticle") {
          const index = object.data.index;
          if (transferPosition < 0.72) {
            const angle = index * 2.399;
            object.visible = true;
            const radius = 0.08 + (index % 4) * 0.09;
            const remaining = 1 - clamp((transferPosition - 0.18) / 1.42) * 0.64;
            const moundRadius = 0.58 * Math.sqrt(remaining);
            const moundHeight = 0.34 * remaining;
            const solidSurface = -1.22 + moundHeight * clamp((1 - radius / moundRadius) / 0.55);
            object.position = [-2.25 + Math.cos(angle) * radius, solidSurface + 0.075 + (index % 3) * 0.018, Math.sin(angle) * radius];
          } else if (transferPosition < 1.72) {
            const fromStage = Math.min(2, Math.floor(transferPosition));
            const toStage = Math.min(2, Math.ceil(transferPosition));
            const amount = transferPosition - fromStage;
            const fromAnchor = object.data.anchors[fromStage]; const toAnchor = object.data.anchors[toStage];
            const anchorX = lerp(fromAnchor[0], toAnchor[0], amount); const anchorY = lerp(fromAnchor[1], toAnchor[1], amount);
            const rotation = lerp(object.data.stageRotations[fromStage], object.data.stageRotations[toStage], amount);
            object.visible = true;
            object.position[0] = anchorX + Math.cos(rotation) * 1.42 + (index % 4) * 0.035;
            object.position[1] = anchorY + Math.sin(rotation) * 1.42 + (index % 3) * 0.035;
            object.position[2] = Math.sin(index * 2.2) * 0.12;
          } else if (transferPosition < 2) {
            const fall = clamp((transferPosition - 1.72 - index * 0.004) / 0.28);
            object.visible = fall >= 0;
            object.position[0] = lerp(2.25, 2.3, fall) + Math.sin(index * 2.2) * 0.1;
            object.position[1] = lerp(-0.68, -1.06, fall);
            object.position[2] = Math.cos(index * 2.1) * 0.18;
          } else {
            const angle = index * 2.399;
            const radius = 0.08 + (index % 4) * 0.1;
            const solidSurface = -1.3 + 0.19 * clamp((1 - radius / 0.68) / 0.55);
            object.visible = true;
            object.position = [2.3 + Math.cos(angle) * radius, solidSurface + 0.07 + (index % 3) * 0.018, Math.sin(angle) * radius];
          }
        }
        if (object.role === "sourceSolidMound") {
          const remaining = 1 - clamp((transferPosition - 0.18) / 1.42) * 0.64;
          object.visible = remaining > 0.02;
          object.scale[0] = object.data.baseScale[0] * Math.sqrt(remaining);
          object.scale[1] = object.data.baseScale[1] * remaining;
          object.scale[2] = object.data.baseScale[2] * Math.sqrt(remaining);
          object.position[1] = object.data.surfaceY + object.scale[1] / 2;
        }
        if (object.role === "destinationSolidMound") {
          const arrived = clamp((transferPosition - 1.7) / 0.3);
          object.visible = arrived > 0.015;
          object.scale[0] = object.data.baseScale[0] * Math.sqrt(Math.max(0.01, arrived));
          object.scale[1] = object.data.baseScale[1] * Math.max(0.01, arrived);
          object.scale[2] = object.data.baseScale[2] * Math.sqrt(Math.max(0.01, arrived));
          object.position[1] = object.data.surfaceY + object.scale[1] / 2;
        }
        if (object.role === "reagentLid") {
          object.position[0] = transferPosition > 0.05 ? -3.05 : -2.25;
          object.position[1] = transferPosition > 0.05 ? -1.15 : 0.32;
          object.rotation[2] = transferPosition > 0.05 ? Math.PI / 2 : 0;
        }
        if (object.role === "hotGlow") { object.visible = transferPosition < 2; object.alpha = 0.18 + Math.sin(time * 5) * 0.05; }
        if (["ppe", "goggles", "gloveLeft", "gloveRight"].includes(object.role)) {
          const alatId = Number(this.options.alatId);
          object.visible = state.done && (alatId === 28 || (alatId === 29 && object.role === "ppe") || (alatId === 30 && object.role === "goggles") || (alatId === 31 && object.role.includes("glove")));
        }
        if (object.role === "coatButton") object.visible = state.done && Number(this.options.alatId) === 29;
        if (object.data.shakeWithVessel) {
          const shakeActive = state.placed && state.running;
          const orbit = state.phase * 0.55;
          const shakeAngle = shakeActive ? Math.sin(orbit) * 0.14 : 0;
          const depthAngle = shakeActive ? Math.cos(orbit) * 0.065 : 0;
          const pivot = object.data.shakePivot;
          const dx = object.position[0] - pivot[0];
          const dy = object.position[1] - pivot[1];
          const dz = object.position[2] - pivot[2];
          const cosine = Math.cos(shakeAngle);
          const sine = Math.sin(shakeAngle);
          const rotatedX = dx * cosine - dy * sine;
          const rotatedY = dx * sine + dy * cosine;
          const depthCosine = Math.cos(depthAngle);
          const depthSine = Math.sin(depthAngle);
          object.position[0] = pivot[0] + rotatedX;
          object.position[1] = pivot[1] + rotatedY * depthCosine - dz * depthSine;
          object.position[2] = pivot[2] + rotatedY * depthSine + dz * depthCosine;
          object.rotation[0] = (object.rotation[0] || 0) + depthAngle;
          object.rotation[2] = (object.rotation[2] || 0) + shakeAngle;
          if (object.role === "liquidSurface") {
            object.rotation[0] -= depthAngle * 0.68;
            object.rotation[2] -= shakeAngle * 0.68;
            object.position[1] += Math.sin(state.phase * 1.1) * 0.035;
          }
        }
      });
    }

    pointerDown(event) {
      this.drag = { x: event.clientX, y: event.clientY, yaw: this.yaw, pitch: this.pitch };
      this.canvas.setPointerCapture?.(event.pointerId);
    }

    pointerMove(event) {
      if (!this.drag) return;
      this.yaw = this.drag.yaw + (event.clientX - this.drag.x) * 0.008;
      this.pitch = clamp(this.drag.pitch + (event.clientY - this.drag.y) * 0.006, -0.15, 0.75);
      this.render();
    }

    pointerUp() { this.drag = null; }

    render() {
      if (this.disposed) return;
      const gl = this.gl;
      const width = this.canvas.width || 900; const height = this.canvas.height || 500;
      gl.viewport(0, 0, width, height);
      gl.clearColor(0.79, 0.91, 0.87, 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE); gl.cullFace(gl.BACK);
      gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(this.program);

      const eye = [
        Math.sin(this.yaw) * Math.cos(this.pitch) * this.distance,
        2.0 + Math.sin(this.pitch) * this.distance,
        Math.cos(this.yaw) * Math.cos(this.pitch) * this.distance
      ];
      const view = lookAt(eye, [0, 0.15, 0], [0, 1, 0]);
      const projection = perspective(42 * Math.PI / 180, width / Math.max(1, height), 0.1, 60);
      gl.uniformMatrix4fv(this.locations.view, false, view);
      gl.uniformMatrix4fv(this.locations.projection, false, projection);
      gl.uniform3fv(this.locations.eye, new Float32Array(eye));

      const visible = this.objects.filter((object) => object.visible && object.alpha > 0.002);
      const distanceFromEye = (object) => Math.hypot(object.position[0] - eye[0], object.position[1] - eye[1], object.position[2] - eye[2]);
      visible.sort((a, b) => {
        const aTransparent = a.alpha < 0.99 || a.glass;
        const bTransparent = b.alpha < 0.99 || b.glass;
        if (aTransparent !== bTransparent) return Number(aTransparent) - Number(bTransparent);
        return aTransparent ? distanceFromEye(b) - distanceFromEye(a) : distanceFromEye(a) - distanceFromEye(b);
      });
      visible.forEach((object) => {
        const mesh = this.meshes[object.mesh];
        const transparent = object.alpha < 0.99 || object.glass;
        if (transparent) gl.disable(gl.CULL_FACE); else gl.enable(gl.CULL_FACE);
        gl.depthMask(!transparent);
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.position);
        gl.enableVertexAttribArray(this.locations.position);
        gl.vertexAttribPointer(this.locations.position, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normal);
        gl.enableVertexAttribArray(this.locations.normal);
        gl.vertexAttribPointer(this.locations.normal, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.uv);
        gl.enableVertexAttribArray(this.locations.uv);
        gl.vertexAttribPointer(this.locations.uv, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.index);
        gl.uniformMatrix4fv(this.locations.model, false, modelMatrix(object));
        gl.uniformMatrix3fv(this.locations.normalMatrix, false, normalMatrix(object));
        gl.uniform4fv(this.locations.color, new Float32Array([object.color[0], object.color[1], object.color[2], object.alpha]));
        gl.uniform1f(this.locations.glass, object.glass ? 1 : 0);
        gl.uniform1f(this.locations.time, this.time || 0);
        gl.uniform1f(this.locations.effect, object.effect || 0);
        gl.uniform1f(this.locations.effectStrength, object.effectStrength || 0);
        gl.uniform1f(this.locations.metallic, object.metallic || 0);
        gl.uniform1f(this.locations.roughness, object.roughness === undefined ? 0.45 : object.roughness);
        if (object.texture) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, object.texture);
          gl.uniform1i(this.locations.texture, 0);
          gl.uniform1f(this.locations.useTexture, 1);
        } else {
          gl.uniform1f(this.locations.useTexture, 0);
        }
        gl.drawElements(gl.TRIANGLES, mesh.count, gl.UNSIGNED_SHORT, 0);
      });
      gl.enable(gl.CULL_FACE);
      gl.depthMask(true);
    }

    dispose() {
      this.disposed = true;
      Object.values(this.meshes).forEach((mesh) => {
        this.gl.deleteBuffer(mesh.position); this.gl.deleteBuffer(mesh.normal); this.gl.deleteBuffer(mesh.uv); this.gl.deleteBuffer(mesh.index);
      });
      this.textures.forEach((texture) => this.gl.deleteTexture?.(texture));
      this.gl.deleteProgram(this.program);
    }
  }

  window.Lab3D = {
    isSupported() {
      try {
        const canvas = document.createElement("canvas");
        return Boolean(window.WebGLRenderingContext && canvas.getContext("webgl"));
      } catch (error) {
        return false;
      }
    },
    create(canvas, options) {
      return new LabScene(canvas, options);
    }
  };
})();
