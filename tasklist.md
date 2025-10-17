# Card Grading Tool - Task List

## 1. Setup Base
- [x] Struttura HTML con Tailwind CDN
- [x] Layout responsive con upload area
- [x] Dark theme
- [x] Sidebar professionale

## 2. Upload & Preview
- [x] Input file immagine
- [x] Preview immagine caricata
- [x] Conversione a base64

## 3. API Integration - Centering
- [x] Chiamata POST a `/card-grader/v2/centering`
- [x] Parsing response (left/right, top/bottom, grade)
- [x] Visualizzazione risultati centering

## 4. API Integration - Full Grading
- [x] Chiamata POST a `/card-grader/v2/grade`
- [x] Parsing response (corners, edges, surface, centering, final)
- [x] Visualizzazione dettagliata risultati

## 5. UI Results Display
- [x] Card risultati centering (L/R, T/B, grade)
- [x] Card grading completo (corners, edges, surface, condition)
- [x] Immagini processate API
- [x] Tema dark per risultati

## 6. Error Handling
- [x] Gestione errori API
- [x] Validazione formato immagine
- [x] Feedback utente

## 7. Navigation
- [x] Sidebar con modalità Centering/Grading
- [x] Switch dinamico tra modalità
- [x] Aggiornamento UI in base alla modalità

## 8. HEIC Support
- [x] Libreria heic2any integrata
- [x] Conversione automatica HEIC → JPEG
- [x] Validazione formato HEIC
- [x] Feedback conversione in corso
