use serde::{Deserialize, Serialize};
use specta::Type;
use tauri_specta::{collect_commands, collect_events, ts};

#[derive(Type, Serialize)]
pub enum MinecraftVersionType {
    Release,
    Snapshot,
    Others,
}

#[derive(Type, Serialize)]
pub enum ModApiType {
    Forge,
    Fabric,
    LiteLoader,
}

#[derive(Type, Serialize)]
pub struct MinecraftVersion {
    pub type_: MinecraftVersionType,
    pub version: String,
}

#[derive(Type, Serialize)]
pub struct Mod {
    pub count: i32,
    pub type_: ModApiType,
}

#[derive(Type, Serialize)]
pub enum Tag {
    Minecraft(MinecraftVersion),
    Mod(Mod),
}

#[derive(Type, Serialize)]
pub struct TagReturn {
    pub tags: Vec<Tag>,
}

#[tauri::command]
#[specta::specta]
fn tag() -> TagReturn {
    let result = vec![
        Tag::Minecraft(MinecraftVersion {
            type_: MinecraftVersionType::Release,
            version: "1.17".into(),
        }),
        Tag::Mod(Mod {
            count: 1,
            type_: ModApiType::Forge,
        }),
    ];
    TagReturn { tags: result }
}

#[tauri::command]
#[specta::specta]
fn hello_world(name: String) -> String {
    return format!("Hello, {}!", name);
}

#[derive(Debug, Clone, Serialize, Deserialize, specta::Type, tauri_specta::Event)]
struct DemoEvent(String);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let (invoke_handler, register_events) = {
        let builder = ts::builder()
            .commands(collect_commands![hello_world, tag])
            .events(collect_events![DemoEvent]);

        #[cfg(debug_assertions)]
        let builder = builder.path("../src/bindings.ts");

        builder.build().unwrap()
    };

    tauri::Builder::default()
        .invoke_handler(invoke_handler)
        .setup(|app| {
            register_events(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
