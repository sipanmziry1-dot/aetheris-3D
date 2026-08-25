<mesh
  key={b.id}
  position={[b.position[0], b.height / 2, b.position[2]]}
  onPointerDown={(e) => {
    e.stopPropagation(); // ڕێگری لە جوڵانی کامێرا دەکات لە کاتی کلیکدا
    setSelected(b.id);
  }}
  onPointerOver={(e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    setHovered(b.id);
  }}
  onPointerOut={() => {
    document.body.style.cursor = "auto";
    setHovered(null);
  }}
>
  <boxGeometry args={[2, b.height, 2]} />
  <meshStandardMaterial
    color={selected === b.id ? "#00ffff" : hovered === b.id ? "#ff007f" : "#0f172a"}
    wireframe={true}
  />
</mesh>