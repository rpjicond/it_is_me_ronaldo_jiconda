import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Text, Line, Trail, OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function DataPacket({ start, end, color = "#0284c7", speed = 0.02, arcHeight = 2 }: { start: THREE.Vector3, end: THREE.Vector3, color?: string, speed?: number, arcHeight?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(Math.random());

  useFrame(() => {
    if (ref.current) {
      const newProgress = (progress + speed) % 1;
      setProgress(newProgress);
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      mid.y += arcHeight;
      const p1 = new THREE.Vector3().lerpVectors(start, mid, newProgress);
      const p2 = new THREE.Vector3().lerpVectors(mid, end, newProgress);
      ref.current.position.lerpVectors(p1, p2, newProgress);
    }
  });

  return (
    <Trail width={0.4} length={6} color={new THREE.Color(color)} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </Trail>
  );
}

function NetworkLines({ connections, color = "#94a3b8", opacity = 0.5 }: { connections: [THREE.Vector3, THREE.Vector3][], color?: string, opacity?: number }) {
  return (
    <group>
      {connections.map((conn, i) => (
        <Line key={i} points={[conn[0], conn[1]]} color={color} transparent opacity={opacity} lineWidth={1.5} dashed dashScale={3} dashSize={0.5} />
      ))}
    </group>
  );
}

function TerminalMonitor({ position, type = "logs" }: { position: [number, number, number], type?: "logs" | "grafana" }) {
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      let commands;
      if (type === "grafana") {
        commands = ["[DASHBOARD] CPU: 45%", "[GRAPH] Temp: 24.1C", "[ALERT] Pressure High", "[DB] Influx: Write OK", "[NET] Latency: 12ms"];
      } else {
        commands = ["[INFO] MQTT: Data Sync", "[WARN] Sensor Weak", "[INFO] GPS Tracking", "[DATA] Value=24.5", "[AUTH] Access OK"];
      }
      const newLog = commands[Math.floor(Math.random() * commands.length)];
      setLogs(prev => [...prev.slice(-8), `> ${newLog}`]);
    }, 800);
    return () => clearInterval(interval);
  }, [type]);

  return (
    <group position={position}>
      <mesh position={[0, -1.2, 0]}><cylinderGeometry args={[0.05, 0.1, 1]} /><meshStandardMaterial color="#64748b" /></mesh>
      <mesh position={[0, -1.7, 0.2]}><boxGeometry args={[1.2, 0.05, 0.8]} /><meshStandardMaterial color="#64748b" /></mesh>
      <mesh><boxGeometry args={[3.4, 2.4, 0.1]} /><meshStandardMaterial color="#1e293b" /></mesh>
      <mesh position={[0, 0, -0.05]}><boxGeometry args={[3.2, 2.2, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
      <mesh position={[0, 0, 0.06]}><planeGeometry args={[3.2, 2.2]} /><meshBasicMaterial color="#000000" /></mesh>
      <group position={[-1.5, 0.9, 0.07]}>
        {logs.map((log, i) => <Text key={i} position={[0, -i * 0.22, 0]} fontSize={0.14} color={type === "grafana" ? "#fbbf24" : "#22c55e"} anchorX="left" material-toneMapped={false}>{log}</Text>)}
      </group>
    </group>
  );
}

function SpringBootServer({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh><boxGeometry args={[2, 3, 2]} /><meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} /></mesh>
      {[1, 0.5, 0, -0.5, -1].map((y, i) => <mesh key={`vent-${i}`} position={[0, y, 1.01]}><boxGeometry args={[1.5, 0.1, 0.02]} /><meshStandardMaterial color="#0f172a" /></mesh>)}
      {[0.5, 0, -0.5].map((y, i) => <mesh key={`led-${i}`} position={[0.8, y + 0.5, 1.01]}><circleGeometry args={[0.04]} /><meshBasicMaterial color="#22c55e" toneMapped={false} /></mesh>)}
      <group position={[2.2, 0, 0.5]} rotation={[0, -0.3, 0]}>
        <TerminalMonitor position={[0, 0, 0]} />
      </group>
      <Text position={[0, 2.2, 0]} fontSize={0.4} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">Backend Server</Text>
    </group>
  );
}

function RaspberryPi({ position }: { position: [number, number, number] }) {
  const pins = useMemo(() => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(<mesh key={`p1-${i}`} position={[-1.2 + i * 0.12, 0.2, -0.9]}><boxGeometry args={[0.04, 0.2, 0.04]} /><meshStandardMaterial color="#d97706" metalness={1} /></mesh>);
      arr.push(<mesh key={`p2-${i}`} position={[-1.2 + i * 0.12, 0.2, -0.75]}><boxGeometry args={[0.04, 0.2, 0.04]} /><meshStandardMaterial color="#d97706" metalness={1} /></mesh>);
    }
    return arr;
  }, []);

  return (
    <group position={position}>
      <mesh><boxGeometry args={[3.5, 0.05, 2.2]} /><meshStandardMaterial color="#16a34a" roughness={0.7} metalness={0.2} /></mesh>
      <mesh position={[0.2, 0.1, 0.2]}><boxGeometry args={[0.8, 0.15, 0.8]} /><meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.4} /></mesh>
      <mesh position={[0, 0.08, -0.82]}><boxGeometry args={[2.5, 0.1, 0.3]} /><meshStandardMaterial color="#020617" /></mesh>
      {pins}
      <group position={[-1.5, 0.3, -0.4]}>
        <mesh><boxGeometry args={[0.6, 0.5, 0.5]} /><meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} /></mesh>
      </group>
      {/* CORREÇÃO APLICADA AQUI: rotation movida para a tag mesh */}
      <mesh position={[1.5, 0.05, -0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.08]} />
        <meshBasicMaterial color="#dc2626" toneMapped={false} />
      </mesh>
      <Text position={[0, 0.8, 0]} fontSize={0.4} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">Gateway (RPi 4)</Text>
    </group>
  );
}

function ESP32({ position, label = "ESP32" }: { position: [number, number, number], label?: string }) {
  return (
    <group position={position}>
      <mesh><boxGeometry args={[1.8, 0.05, 1]} /><meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.1} /></mesh>
      <mesh position={[0.3, 0.08, 0]}><boxGeometry args={[0.7, 0.1, 0.6]} /><meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} /></mesh>
      <mesh position={[0.7, 0.03, 0]}><boxGeometry args={[0.2, 0.01, 0.5]} /><meshStandardMaterial color="#d97706" metalness={0.8} /></mesh>
      <Text position={[0, 0.6, 0]} fontSize={0.3} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">{label}</Text>
    </group>
  );
}

function Sensor({ position, color = "#0ea5e9" }: { position: [number, number, number], color?: string }) {
  return (
    <group position={position}>
      <mesh><cylinderGeometry args={[0.2, 0.2, 0.4]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[0, -0.2, 0]}><boxGeometry args={[0.5, 0.1, 0.5]} /><meshStandardMaterial color="#334155" /></mesh>
    </group>
  )
}

function ProfessionalSwitch({ position, label, ports = 24, color = "#1e293b" }: { position: [number, number, number], label: string, ports?: number, color?: string }) {
  const renderedPorts = useMemo(() => {
    let arr = [];
    const startX = -1.2;
    for (let i = 0; i < ports; i++) {
      const isTop = i % 2 === 0;
      const xOffset = startX + Math.floor(i / 2) * 0.22;
      const yOffset = isTop ? 0.1 : -0.15;
      arr.push(
        <group key={`port-${i}`} position={[xOffset, yOffset, 0.61]}>
          <mesh><boxGeometry args={[0.15, 0.15, 0.05]} /><meshBasicMaterial color="#020617" /></mesh>
          <mesh position={[-0.05, 0.1, 0.02]}><circleGeometry args={[0.015]} /><meshBasicMaterial color="#22c55e" toneMapped={false} /></mesh>
          <mesh position={[0.05, 0.1, 0.02]}><circleGeometry args={[0.015]} /><meshBasicMaterial color={i % 3 === 0 ? "#eab308" : "#22c55e"} toneMapped={false} /></mesh>
        </group>
      );
    }
    return arr;
  }, [ports]);

  return (
    <group position={position}>
      <mesh><boxGeometry args={[3.2, 0.6, 1.2]} /><meshStandardMaterial color={color} metalness={0.6} roughness={0.3} /></mesh>
      {renderedPorts}
      <Text position={[0, 0.6, 0]} fontSize={0.25} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">{label}</Text>
    </group>
  );
}

function RouterNode({ position, label }: { position: [number, number, number], label: string }) {
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.8, 0.8, 0.3, 32]} /><meshStandardMaterial color="#0284c7" metalness={0.5} /></mesh>
      <mesh position={[0, 0, 0.16]}><boxGeometry args={[0.8, 0.1, 0.02]} /><meshBasicMaterial color="white" /></mesh>
      <mesh position={[0, 0, 0.16]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.8, 0.1, 0.02]} /><meshBasicMaterial color="white" /></mesh>
      <Text position={[0, 1.0, 0]} fontSize={0.3} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">{label}</Text>
    </group>
  );
}

function FirewallNode({ position, label }: { position: [number, number, number], label: string }) {
  return (
    <group position={position}>
      <mesh><boxGeometry args={[1.5, 0.8, 0.6]} /><meshStandardMaterial color="#dc2626" metalness={0.6} /></mesh>
      <mesh position={[0, 0, 0.31]}><planeGeometry args={[1.2, 0.5]} /><meshStandardMaterial color="#ef4444" /></mesh>
      <mesh position={[0, 0.1, 0.32]}><boxGeometry args={[1.2, 0.03, 0.01]} /><meshBasicMaterial color="white" /></mesh>
      <mesh position={[0, -0.1, 0.32]}><boxGeometry args={[1.2, 0.03, 0.01]} /><meshBasicMaterial color="white" /></mesh>
      <Text position={[0, 0.7, 0]} fontSize={0.25} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">{label}</Text>
    </group>
  );
}

function ServerRack({ position, label }: { position: [number, number, number], label: string }) {
  return (
    <group position={position}>
      <mesh><boxGeometry args={[1.2, 4.0, 1.2]} /><meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[0, 0, 0.61]}><boxGeometry args={[1.1, 3.8, 0.02]} /><meshStandardMaterial color="#020617" opacity={0.6} transparent metalness={0.9} roughness={0.1} /></mesh>
      {[-1.5, -1, -0.5, 0, 0.5, 1, 1.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0.55]}><boxGeometry args={[1.0, 0.3, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
      ))}
      <Text position={[0, 2.3, 0]} fontSize={0.3} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">{label}</Text>
    </group>
  );
}

function CloudNode({ position, label, color = "#0ea5e9" }: { position: [number, number, number], label: string, color?: string }) {
  return (
    <group position={position}>
      <mesh><sphereGeometry args={[1]} /><meshStandardMaterial color={color} transparent opacity={0.8} /></mesh>
      <Text position={[0, 1.4, 0]} fontSize={0.3} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">{label}</Text>
    </group>
  );
}

function MicroserviceNode({ position, label, tech, color = "#3b82f6" }: { position: [number, number, number], label: string, tech: string, color?: string }) {
  return (
    <group position={position}>
      <mesh><cylinderGeometry args={[1.2, 1.2, 0.1, 6]} /><meshStandardMaterial color={color} transparent opacity={0.5} /></mesh>
      <mesh position={[0, 0.5, 0]}><boxGeometry args={[1.4, 0.8, 1.4]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
      <Text position={[0, 1.2, 0]} fontSize={0.3} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">{label}</Text>
      <Text position={[0, 0.5, 0.72]} fontSize={0.2} color="#0f172a">{tech}</Text>
    </group>
  );
}

function DatabaseNode({ position, label, color = "#10b981" }: { position: [number, number, number], label: string, color?: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.7, 0.7, 1.2, 32]} /><meshStandardMaterial color="#64748b" /></mesh>
      <Text position={[0, 1.5, 0]} fontSize={0.25} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">{label}</Text>
    </group>
  );
}

function IndustrialConveyor({ position }: { position: [number, number, number] }) {
  const boxRef1 = useRef<THREE.Mesh>(null);
  const boxRef2 = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (boxRef1.current) boxRef1.current.position.x = ((t * 1.5) % 6) - 3;
    if (boxRef2.current) boxRef2.current.position.x = (((t * 1.5) + 3) % 6) - 3;
  });
  return (
    <group position={position}>
      <mesh><boxGeometry args={[6, 0.4, 1]} /><meshStandardMaterial color="#cbd5e1" /></mesh>
      <mesh position={[0, 0.21, 0]}><boxGeometry args={[5.8, 0.05, 0.8]} /><meshStandardMaterial color="#1e293b" /></mesh>
      <mesh ref={boxRef1} position={[0, 0.5, 0]}><boxGeometry args={[0.5, 0.5, 0.5]} /><meshStandardMaterial color="#d97706" /></mesh>
      <mesh ref={boxRef2} position={[0, 0.5, 0]}><boxGeometry args={[0.5, 0.5, 0.5]} /><meshStandardMaterial color="#d97706" /></mesh>
    </group>
  );
}

function RoboticArm({ position, color = "#ea580c" }: { position: [number, number, number], color?: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.5;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.4, 0.5, 0.4]} /><meshStandardMaterial color="#334155" /></mesh>
      <group ref={ref} position={[0, 0.4, 0]}>
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.25, 0.25, 0.5]} /><meshStandardMaterial color={color} /></mesh>
        <mesh position={[0, 0.8, 0]}><boxGeometry args={[0.2, 1.2, 0.2]} /><meshStandardMaterial color={color} /></mesh>
        <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.15, 0.15, 0.4]} /><meshStandardMaterial color="#94a3b8" /></mesh>
        <mesh position={[0, 1.7, 0.3]} rotation={[0.6, 0, 0]}><boxGeometry args={[0.15, 0.8, 0.15]} /><meshStandardMaterial color={color} /></mesh>
        <mesh position={[0, 2.0, 0.55]} rotation={[0.6, 0, 0]}><cylinderGeometry args={[0.1, 0.1, 0.3]} /><meshStandardMaterial color="#334155" /></mesh>
        <mesh position={[0, 2.15, 0.65]}><sphereGeometry args={[0.08]} /><meshBasicMaterial color="#0284c7" toneMapped={false} /></mesh>
      </group>
    </group>
  );
}

function NodeRedInstance({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh><boxGeometry args={[2, 1, 1]} /><meshStandardMaterial color="#8f0000" /></mesh>
      <mesh position={[0, 0.6, 0]}><boxGeometry args={[1.8, 0.1, 0.8]} /><meshStandardMaterial color="#cc0000" /></mesh>
      <Text position={[0, 1.2, 0]} fontSize={0.3} color="#0f172a" outlineWidth={0.02} outlineColor="#ffffff">Node-RED</Text>
      <Text position={[0, 0, 0.51]} fontSize={0.2} color="white">Flow Engine</Text>
    </group>
  );
}

function ZoneFloor({ position, color, label, size = [6, 4] }: { position: [number, number, number], color: string, label: string, size?: [number, number] }) {
  const pts = [
    new THREE.Vector3(-size[0] / 2, -size[1] / 2, -0.5),
    new THREE.Vector3(size[0] / 2, -size[1] / 2, -0.5),
    new THREE.Vector3(size[0] / 2, size[1] / 2, -0.5),
    new THREE.Vector3(-size[0] / 2, size[1] / 2, -0.5),
    new THREE.Vector3(-size[0] / 2, -size[1] / 2, -0.5)
  ];

  return (
    <group position={position}>
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[size[0], size[1]]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      <Line points={pts} color={color} lineWidth={2} dashed dashScale={10} dashSize={1} />
      <Text position={[0, size[1] / 2 - 0.4, -0.4]} fontSize={0.3} color={color} outlineWidth={0.01} outlineColor="#fff">{label}</Text>
    </group>
  );
}

// --- SCENARIOS ---

function IoTArchitecture() {
  const rpiPos = new THREE.Vector3(0, 0, 0);
  const serverPos = new THREE.Vector3(0, 5, -5);

  const agroESP = new THREE.Vector3(-6, 0, 3);
  const indESP = new THREE.Vector3(6, 0, 3);
  const cityESP = new THREE.Vector3(0, -3, 5);

  const sensors = useMemo(() => {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      arr.push({ pos: new THREE.Vector3(agroESP.x + Math.cos(angle) * 2, 0, agroESP.z + Math.sin(angle) * 2), color: "#ea580c", parent: agroESP });
      arr.push({ pos: new THREE.Vector3(indESP.x + Math.cos(angle) * 2, 0, indESP.z + Math.sin(angle) * 2), color: "#0284c7", parent: indESP });
      arr.push({ pos: new THREE.Vector3(cityESP.x + Math.cos(angle) * 2, 0, cityESP.z + Math.sin(angle) * 2), color: "#16a34a", parent: cityESP });
    }
    return arr;
  }, [agroESP.x, agroESP.z, indESP.x, indESP.z, cityESP.x, cityESP.z]);

  const connections: [THREE.Vector3, THREE.Vector3][] = [[agroESP, rpiPos], [indESP, rpiPos], [cityESP, rpiPos], [rpiPos, serverPos]];
  sensors.forEach(s => connections.push([s.pos, s.parent]));

  return (
    <group>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}><SpringBootServer position={[serverPos.x, serverPos.y, serverPos.z]} /></Float>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}><RaspberryPi position={[rpiPos.x, rpiPos.y, rpiPos.z]} /></Float>
      <ESP32 position={[agroESP.x, agroESP.y, agroESP.z]} label="Agro Concentrator" />
      <ESP32 position={[indESP.x, indESP.y, indESP.z]} label="Industry Concentrator" />
      <ESP32 position={[cityESP.x, cityESP.y, cityESP.z]} label="Smart City Concentrator" />
      {sensors.map((s, i) => (
        <group key={i}>
          <Sensor position={[s.pos.x, s.pos.y, s.pos.z]} color={s.color} />
          <DataPacket start={s.pos} end={s.parent} color={s.color} speed={0.02 + Math.random() * 0.02} />
        </group>
      ))}
      <DataPacket start={rpiPos} end={serverPos} color="#9333ea" />
      <DataPacket start={agroESP} end={rpiPos} color="#ea580c" />
      <DataPacket start={indESP} end={rpiPos} color="#0284c7" />
      <DataPacket start={cityESP} end={rpiPos} color="#16a34a" />
      <NetworkLines connections={connections} />
    </group>
  );
}

function EnterpriseNetwork() {
  const isp1 = new THREE.Vector3(-5, 9, 0); const isp2 = new THREE.Vector3(0, 9, 0); const isp3 = new THREE.Vector3(5, 9, 0);
  const pe1 = new THREE.Vector3(-3.5, 7.5, 0.5); const pe2 = new THREE.Vector3(0, 7.5, 0.5); const pe3 = new THREE.Vector3(3.5, 7.5, 0.5);
  const swWanA = new THREE.Vector3(-1.5, 6, 1); const swWanB = new THREE.Vector3(1.5, 6, 1);
  const fw1 = new THREE.Vector3(-2.5, 4.5, 1.5); const fw2 = new THREE.Vector3(2.5, 4.5, 1.5);
  const core1 = new THREE.Vector3(-1.5, 2.5, 1.5); const core2 = new THREE.Vector3(1.5, 2.5, 1.5);
  const dist3 = new THREE.Vector3(-5, 1, 1.5); const dist1 = new THREE.Vector3(-1.5, -0.5, 1.5); const dist2 = new THREE.Vector3(1.5, -0.5, 1.5); const dist4 = new THREE.Vector3(5, 1, 1.5);
  const acc1 = new THREE.Vector3(-8, 2, 2); const acc2 = new THREE.Vector3(-8, -2, 2); const acc3 = new THREE.Vector3(8, 2, 2); const acc4 = new THREE.Vector3(8, -2, 2);
  const swDmz = new THREE.Vector3(7, 6, 1); const cloudDmz = new THREE.Vector3(7, 7.5, 0);

  const connections: [THREE.Vector3, THREE.Vector3][] = [
    [isp1, pe1], [isp2, pe2], [isp3, pe3], [pe1, swWanA], [pe1, swWanB], [pe2, swWanA], [pe2, swWanB], [pe3, swWanB], [swWanA, fw1], [swWanB, fw2], [fw1, swWanB], [fw2, swWanA], [fw1, fw2], [fw1, core1], [fw2, core2], [fw1, core2], [fw2, core1], [core1, dist3], [core1, dist1], [core1, dist4], [core1, dist2], [core2, dist3], [core2, dist1], [core2, dist4], [core2, dist2], [dist3, dist1], [dist1, dist2], [dist2, dist4], [dist3, acc2], [dist1, acc2], [dist4, acc3], [dist2, acc4], [dist4, acc4], [fw2, swDmz], [swDmz, cloudDmz]
  ];

  return (
    <group scale={0.45} position={[0, -0.5, 0]}>
      <CloudNode position={isp1.toArray()} label="Orange (AS100)" color="#ea580c" />
      <CloudNode position={isp2.toArray()} label="SFR (AS200)" color="#dc2626" />
      <CloudNode position={isp3.toArray()} label="Bouygues (AS300)" color="#0284c7" />
      <RouterNode position={pe1.toArray()} label="ISP01-PE" />
      <RouterNode position={pe2.toArray()} label="ISP02-PE" />
      <RouterNode position={pe3.toArray()} label="ISP03-PE" />
      <ProfessionalSwitch position={swWanA.toArray()} label="SW-WAN-A" ports={8} color="#3b82f6" />
      <ProfessionalSwitch position={swWanB.toArray()} label="SW-WAN-B" ports={8} color="#3b82f6" />
      <FirewallNode position={fw1.toArray()} label="FW-EDGE-01" />
      <FirewallNode position={fw2.toArray()} label="FW-EDGE-02" />
      <ProfessionalSwitch position={core1.toArray()} label="CORE-SW-01" ports={24} color="#1e293b" />
      <ProfessionalSwitch position={core2.toArray()} label="CORE-SW-02" ports={24} color="#1e293b" />
      <ProfessionalSwitch position={dist3.toArray()} label="DIST-SW-03" ports={24} color="#0284c7" />
      <ProfessionalSwitch position={dist1.toArray()} label="DIST-SW-01" ports={24} color="#0284c7" />
      <ProfessionalSwitch position={dist2.toArray()} label="DIST-SW-02" ports={24} color="#0284c7" />
      <ProfessionalSwitch position={dist4.toArray()} label="DIST-SW-04" ports={24} color="#0284c7" />

      <ZoneFloor position={swDmz.toArray()} color="#991b1b" label="DMZ (Services)" size={[5, 5]} />
      <ProfessionalSwitch position={swDmz.toArray()} label="SW-DMZ" ports={8} color="#991b1b" />
      <CloudNode position={cloudDmz.toArray()} label="vSW-DMZ" color="#991b1b" />

      <ZoneFloor position={acc1.toArray()} color="#eab308" label="USERS + WI-FI (VLAN 10,30,60)" size={[6, 3.5]} />
      <ProfessionalSwitch position={acc1.toArray()} label="ACC-SW-01" ports={48} color="#eab308" />

      <ZoneFloor position={acc2.toArray()} color="#16a34a" label="SERVERS / DC (VLAN 20)" size={[6, 3.5]} />
      <ProfessionalSwitch position={acc2.toArray()} label="ACC-SW-02" ports={48} color="#16a34a" />

      <ZoneFloor position={acc3.toArray()} color="#0ea5e9" label="LAB / EXPANSION" size={[6, 3.5]} />
      <ProfessionalSwitch position={acc3.toArray()} label="ACC-SW-03" ports={48} color="#0ea5e9" />

      <ZoneFloor position={acc4.toArray()} color="#ea580c" label="ADMIN / OPS (VLAN 99)" size={[6, 3.5]} />
      <ProfessionalSwitch position={acc4.toArray()} label="ACC-SW-04" ports={48} color="#ea580c" />

      <NetworkLines connections={connections} />
      <DataPacket start={acc1} end={dist3} color="#eab308" speed={0.04} />
      <DataPacket start={dist3} end={core1} color="#0284c7" speed={0.04} />
      <DataPacket start={core1} end={fw1} color="#dc2626" speed={0.04} />
    </group>
  );
}

function SmartCity() {
  const center = new THREE.Vector3(0, 0, 0);
  const nodes = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(angle) * 7, Math.sin(angle) * 2, Math.sin(angle) * 5);
  });
  const connections: [THREE.Vector3, THREE.Vector3][] = [];
  nodes.forEach(n => connections.push([n, center]));

  return (
    <group>
      <CloudNode position={[center.x, center.y + 2, center.z]} label="City Data Lake" />
      {nodes.map((pos, i) => (
        <group key={i}>
          <ESP32 position={[pos.x, pos.y, pos.z]} label={`Node ${i + 1}`} />
          <DataPacket start={pos} end={center} color="#0ea5e9" speed={0.02 + Math.random() * 0.02} />
        </group>
      ))}
      <NetworkLines connections={connections} color="#94a3b8" opacity={0.4} />
    </group>
  );
}

function IndustrialAutomation() {
  const scada = new THREE.Vector3(0, 4, -3);
  const plc = new THREE.Vector3(0, 0, 0);

  return (
    <group>
      <group position={[2.5, 4, -3]}><TerminalMonitor position={[0, 0, 0]} /></group>
      <Text position={[0, 5.5, -3]} fontSize={0.5} color="#dc2626" outlineWidth={0.02} outlineColor="#ffffff">SCADA</Text>
      <ProfessionalSwitch position={[plc.x, plc.y, plc.z]} label="Master PLC" ports={12} />
      <RoboticArm position={[-5, -2, 3]} />
      <RoboticArm position={[5, -2, 3]} />
      <IndustrialConveyor position={[0, -2, 1]} />
      <NetworkLines connections={[[new THREE.Vector3(-5, -2, 3), plc], [new THREE.Vector3(5, -2, 3), plc], [plc, scada]]} color="#dc2626" opacity={0.6} />
    </group>
  );
}

function DataCenter() {
  const racksLeft = [-6, -3].map(x => new THREE.Vector3(x, 0, 2));
  const racksRight = [3, 6].map(x => new THREE.Vector3(x, 0, 2));
  const core = new THREE.Vector3(0, 3, -2);

  return (
    <group>
      <ProfessionalSwitch position={[core.x, core.y, core.z]} label="Core Gateway" ports={48} />
      {[...racksLeft, ...racksRight].map((pos, i) => (
        <group key={i}>
          <ServerRack position={[pos.x, pos.y, pos.z]} label={`Rack ${i + 1}`} />
          <DataPacket start={pos} end={core} color="#9333ea" />
          <NetworkLines connections={[[pos, core]]} />
        </group>
      ))}
    </group>
  );
}

function SchoolMicroservices() {
  const gateway = new THREE.Vector3(0, 3, 0);
  const auth = new THREE.Vector3(-5, 0, 3);
  const student = new THREE.Vector3(0, 0, 3);
  const course = new THREE.Vector3(5, 0, 3);

  return (
    <group>
      <MicroserviceNode position={[gateway.x, gateway.y, gateway.z]} label="API Gateway" tech="Spring Cloud" color="#38bdf8" />
      <MicroserviceNode position={[auth.x, auth.y, auth.z]} label="Auth Service" tech="OAuth2" color="#f43f5e" />
      <MicroserviceNode position={[student.x, student.y, student.z]} label="Student Service" tech="Spring Boot" color="#4ade80" />
      <MicroserviceNode position={[course.x, course.y, course.z]} label="Course Service" tech="Spring Boot" color="#4ade80" />
      <DatabaseNode position={[0, -3, 3]} label="Shared DB" />
      <NetworkLines connections={[[auth, gateway], [student, gateway], [course, gateway]]} />
      <DataPacket start={gateway} end={student} color="#4ade80" />
    </group>
  );
}

function AnalyticsStack() {
  const nodeRedPos = new THREE.Vector3(0, 0, 0);
  const influxPos = new THREE.Vector3(4, 0, 0);
  const grafanaPos = new THREE.Vector3(4, 3, 0);
  const sensorSource = new THREE.Vector3(-4, 0, 2);

  return (
    <group>
      <Text position={[0, 5, 0]} fontSize={0.5} color="#0f172a" outlineWidth={0.02} outlineColor="#fff">IoT Analytics Pipeline</Text>
      <group position={sensorSource.toArray()}>
        <ESP32 position={[0, 0, 0]} label="Sensor Array" />
        <mesh position={[0, -1, 0]}><boxGeometry args={[2, 0.2, 2]} /><meshStandardMaterial color="#64748b" /></mesh>
      </group>
      <NodeRedInstance position={nodeRedPos.toArray()} />
      <DatabaseNode position={influxPos.toArray()} label="InfluxDB (TimeSeries)" color="#7e22ce" />
      <group position={grafanaPos.toArray()}>
        <TerminalMonitor position={[0, 0, 0]} type="grafana" />
        <Text position={[0, 2, 0]} fontSize={0.3} color="#ea580c" outlineWidth={0.01} outlineColor="#fff">Grafana Dashboard</Text>
      </group>
      <NetworkLines connections={[[sensorSource, nodeRedPos], [nodeRedPos, influxPos], [influxPos, grafanaPos]]} />
      <DataPacket start={sensorSource} end={nodeRedPos} color="#0ea5e9" speed={0.04} />
      <DataPacket start={nodeRedPos} end={influxPos} color="#dc2626" speed={0.03} />
      <DataPacket start={influxPos} end={grafanaPos} color="#ea580c" speed={0.03} />
    </group>
  );
}

// --- MAIN SCENE EXPORT ---
export default function Scene({ scenario }: { scenario: number }) {
  return (
    <>
      <color attach="background" args={['#f8fafc']} />
      <fog attach="fog" args={['#f8fafc', 20, 50]} />
      <PerspectiveCamera makeDefault position={[-2, 4, 18]} fov={50} />
      <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={0.1} target={[0, 0, 0]} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 4} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" castShadow />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
      <pointLight position={[-10, -10, -10]} intensity={1.0} color="#22c55e" />
      <Environment preset="city" />
      {/* CORREÇÃO APLICADA AQUI: disableNormalPass alterado para enableNormalPass={false} */}
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} />
      </EffectComposer>
      <group position={[0, -1, 0]} scale={1.1}>
        {scenario === 0 && <IoTArchitecture />}
        {scenario === 1 && <EnterpriseNetwork />}
        {scenario === 2 && <SmartCity />}
        {scenario === 3 && <IndustrialAutomation />}
        {scenario === 4 && <DataCenter />}
        {scenario === 5 && <SchoolMicroservices />}
        {scenario === 6 && <AnalyticsStack />}
      </group>
    </>
  );
}