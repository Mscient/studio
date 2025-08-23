import 'package:flutter/material.dart';

class PatientPrescriptionsScreen extends StatelessWidget {
  const PatientPrescriptionsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Prescriptions'),
      ),
      body: ListView.builder(
        itemCount: 5, // Placeholder: Replace with actual prescriptions list length
        itemBuilder: (context, index) {
          return PrescriptionCard(
            doctorName: 'Dr. Placeholder',
            date: 'Date Placeholder',
            medicines: const ['Medicine A - 1 tablet daily', 'Medicine B - 2 times a day'], // Placeholder
            notes: 'Take with food.', // Placeholder
          );
        },
      ),
    );
  }
}

class PrescriptionCard extends StatelessWidget {
  final String doctorName;
  final String date;
  final List<String> medicines;
  final String notes;

  const PrescriptionCard({
    Key? key,
    required this.doctorName,
    required this.date,
    required this.medicines,
    required this.notes,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Dr. $doctorName',
              style: const TextStyle(
                fontSize: 18.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4.0),
            Text(
              'Date: $date',
              style: TextStyle(
                fontSize: 14.0,
                color: Colors.grey[600],
              ),
            ),
            const SizedBox(height: 12.0),
            const Text(
              'Medicines:',
              style: TextStyle(
                fontSize: 16.0,
                fontWeight: FontWeight.w600,
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: medicines.map((medicine) => Text('- $medicine')).toList(),
            ),
            const SizedBox(height: 12.0),
            const Text(
              'Notes:',
              style: TextStyle(
                fontSize: 16.0,
                fontWeight: FontWeight.w600,
              ),
            ),
            Text(notes),
            const SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () {
                    // TODO: Implement Download PDF functionality
                  },
                  child: const Text('Download PDF'),
                ),
                const SizedBox(width: 8.0),
                ElevatedButton(
                  onPressed: () {
                    // TODO: Implement Order Medicines functionality (link to pharmacy)
                  },
                  child: const Text('Order Medicines'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}