console.log('=== Pruebas de parsing de fechas ===');
console.log('1997-01-01:', new Date('1997-01-01'));
console.log('1997/01/01:', new Date('1997/01/01'));
console.log('01/01/1997:', new Date('01/01/1997'));
console.log('1997-1-1:', new Date('1997-1-1'));
console.log('January 1, 1997:', new Date('January 1, 1997'));
console.log('1 January 1997:', new Date('1 January 1997'));
console.log('1997:', new Date('1997'));

console.log('\n=== Cálculo de edad con diferentes formatos ===');
const birthDate = new Date(1995, 8, 22); // 22 septiembre 1995

function calcAge(eventDateStr) {
  const eventDate = new Date(eventDateStr);
  const age = eventDate.getFullYear() - birthDate.getFullYear();
  const adjustedAge = (eventDate.getMonth() < birthDate.getMonth() || 
    (eventDate.getMonth() === birthDate.getMonth() && eventDate.getDate() < birthDate.getDate())) 
    ? age - 1 : age;
  console.log(`Evento: ${eventDateStr} -> ${eventDate.toLocaleDateString('es-ES')} -> Edad: ${adjustedAge} años`);
}

calcAge('1997-01-01');
calcAge('1997-12-31');
calcAge('1997');
calcAge('January 1997');

// Probar fechas problemáticas
console.log('\n=== Fechas problemáticas ===');
const problematicDates = ['1997', '1997-01', '1997-1-1', 'Jan 1997'];
problematicDates.forEach(dateStr => {
  const date = new Date(dateStr);
  console.log(`${dateStr} -> ${date.toString()} -> Valid: ${!isNaN(date.getTime())}`);
});