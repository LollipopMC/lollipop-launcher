use serde::{Deserialize, Serialize};
use tauri_specta::{collect_commands, collect_events, ts};

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
            .commands(collect_commands![hello_world])
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
