import bpy
import math

# --- Clear scene ---
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Remove default objects if any
for obj in bpy.data.objects:
    if obj.type in ('MESH', 'CURVE', 'EMPTY'):
        bpy.data.objects.remove(obj, do_unlink=True)

# --- Materials ---
def make_mat(name, color, roughness=0.5):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value = (*color, 1.0)
    bsdf.inputs['Roughness'].default_value = roughness
    out = nodes.new('ShaderNodeOutputMaterial')
    out.location = (300, 0)
    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return mat

mat_skin = make_mat("Skin", (0.92, 0.78, 0.72), 0.6)
mat_eyes = make_mat("Eyes", (0.6, 0.7, 0.8), 0.2)
mat_hair = make_mat("Hair", (0.35, 0.22, 0.15), 0.7)
mat_dress = make_mat("Dress", (0.95, 0.95, 0.95), 0.8)
mat_table = make_mat("Table", (0.6, 0.45, 0.3), 0.7)

# --- Head ---
bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, radius=1.0, location=(0, 0, 3.2))
head = bpy.context.active_object
head.name = "Head"
head.scale = (1.0, 0.85, 1.05)  # slightly oval Blythe shape
head.data.materials.append(mat_skin)

# --- Eyes (two spheres) ---
for side in (-1, 1):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.28, location=(side * 0.32, 0.72, 3.25))
    eye = bpy.context.active_object
    eye.name = f"Eye_{'L' if side == -1 else 'R'}"
    eye.scale = (1.0, 0.6, 1.0)
    eye.data.materials.append(mat_eyes)

# --- Body (torso) ---
bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.35, depth=0.9, location=(0, 0, 2.2))
torso = bpy.context.active_object
torso.name = "Torso"
torso.scale = (1.0, 0.7, 1.0)
torso.data.materials.append(mat_skin)

# --- Arms ---
for side in (-1, 1):
    bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=0.09, depth=1.1, location=(side * 0.55, 0, 2.3))
    arm = bpy.context.active_object
    arm.name = f"Arm_{'L' if side == -1 else 'R'}"
    arm.rotation_euler = (0, math.radians(side * 10), 0)
    arm.data.materials.append(mat_skin)

# --- Legs ---
for side in (-1, 1):
    bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=0.1, depth=1.0, location=(side * 0.18, 0, 1.3))
    leg = bpy.context.active_object
    leg.name = f"Leg_{'L' if side == -1 else 'R'}"
    leg.data.materials.append(mat_skin)

# --- Dress (simple cone/dress shape) ---
bpy.ops.mesh.primitive_cone_add(vertices=16, radius1=0.42, radius2=0.55, depth=0.8, location=(0, 0, 1.9))
dress = bpy.context.active_object
dress.name = "Dress"
dress.data.materials.append(mat_dress)

# --- Hair (simple cap) ---
bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, radius=1.05, location=(0, 0, 3.25))
hair = bpy.context.active_object
hair.name = "Hair"
hair.scale = (1.02, 0.88, 1.02)
hair.data.materials.append(mat_hair)

# --- Table ---
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.4))
table = bpy.context.active_object
table.name = "Table"
table.scale = (3.0, 2.0, 0.05)
table.data.materials.append(mat_table)

# --- Camera ---
bpy.ops.object.camera_add(location=(2.5, -3.5, 3.0), rotation=(math.radians(70), 0, math.radians(35)))
cam = bpy.context.active_object
cam.name = "Camera"
bpy.context.scene.camera = cam

# --- Lights ---
# Key light (warm)
bpy.ops.object.light_add(type='AREA', location=(3, -2, 4))
key = bpy.context.active_object
key.name = "KeyLight"
key.data.energy = 80
key.data.size = 2
key.data.color = (1.0, 0.95, 0.9)

# Fill (cool)
bpy.ops.object.light_add(type='AREA', location=(-3, 1, 3))
fill = bpy.context.active_object
fill.name = "FillLight"
fill.data.energy = 30
fill.data.size = 3
fill.data.color = (0.85, 0.9, 1.0)

# Rim
bpy.ops.object.light_add(type='AREA', location=(0, 3, 2))
rim = bpy.context.active_object
rim.name = "RimLight"
rim.data.energy = 40
rim.data.size = 2
rim.data.color = (1.0, 0.98, 0.95)

# --- Viewport shading ---
for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
        for space in area.spaces:
            if space.type == 'VIEW_3D':
                space.shading.type = 'MATERIAL'

print("DONE: Blythe blockout created")
