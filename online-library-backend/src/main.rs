use rocket::serde::{json::Json, Serialize};
use rocket::State;
use uuid::Uuid;

#[macro_use]
extern crate rocket;

struct AvailableBooks(Vec<Book>);

#[derive(Debug, Serialize, Clone)]
#[serde(crate = "rocket::serde")]
struct Book {
    id: Uuid,
    name: String,
    author: String,
}
#[get("/")]
fn index() -> &'static str {
    "Hello to WIP online library"
}

// Reader User endpoints
#[get("/available_books")]
fn available_books(available_books: &State<AvailableBooks>) -> Json<Vec<Book>> {
    Json(available_books.0.clone())
}

#[get("/rent_book/<book_uuid>")]
fn rent_book(book_uuid: Uuid) -> String {
    format!("I see you would like to rent book: {book_uuid}")
}

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    let _rocket = rocket::build()
        .mount("/", routes![index, available_books, rent_book])
        .manage(AvailableBooks(vec![
            Book {
                id: uuid::uuid!("e72e6206-6553-43e8-9d91-d47133b6c1ad"),
                name: "Inferno".to_string(),
                author: "Dante Alighieri".to_string(),
            },
            Book {
                id: uuid::uuid!("14e4734d-8484-4718-8897-c364aceee403"),
                name: "Principia Mathematica".to_string(),
                author: "Isaac Newton".to_string(),
            },
            Book {
                id: uuid::uuid!("2ec830e1-f59d-4826-888d-48009733862c"),
                name: "On the Origin of Species".to_string(),
                author: "Charles Darwin".to_string(),
            },
        ]))
        .launch()
        .await?;

    Ok(())
}
