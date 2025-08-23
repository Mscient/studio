import 'package:flutter/material.dart';

class PatientMedicationScreen extends StatefulWidget {
 const PatientMedicationScreen({Key? key}) : super(key: key);

 @override
 _PatientMedicationScreenState createState() => _PatientMedicationScreenState();
}

class _PatientMedicationScreenState extends State<PatientMedicationScreen> {
 // Placeholder list for medications
 final List<Map<String, dynamic>> _medications = [
    {'name': 'Aspirin', 'dosage': '100mg', 'schedule': 'Once daily'},
    {'name': 'Lisinopril', 'dosage': '10mg', 'schedule': 'Once daily'},
  ];

 // Controllers for form fields
 final TextEditingController _nameController = TextEditingController();
 final TextEditingController _dosageController = TextEditingController();
 final TextEditingController _frequencyController = TextEditingController();
 final TextEditingController _startDateController = TextEditingController();
 final TextEditingController _endDateController = TextEditingController();

 void _addMedication() {
    // Placeholder function to add a new medication
    // In a real app, you would collect data from the form fields
    // and save it (e.g., to Firestore).
    print('Add Medication button pressed');
    // Clear form fields after adding
    _nameController.clear();
    _dosageController.clear();
    _frequencyController.clear();
    _startDateController.clear();
    _endDateController.clear();
  }

 @override
 void dispose() {
    _nameController.dispose();
    _dosageController.dispose();
    _frequencyController.dispose();
    _startDateController.dispose();
    _endDateController.dispose();
 super.dispose();
  }

 @override
 Widget build(BuildContext context) {
 return Scaffold(
      appBar: AppBar(
        title: const Text('Medication Management'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
 child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
 children: [
            const Text(
 'My Medications',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
 Expanded(
 child: ListView.builder(
 itemCount: _medications.length,
 itemBuilder: (context, index) {
 final medication = _medications[index];
 return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
 child: ListTile(
 title: Text(medication['name']),
 subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
 children: [
 Text('Dosage: ${medication['dosage']}'),
 Text('Schedule: ${medication['schedule']}'),
                          ],
 ),
 trailing: Row(
                          mainAxisSize: MainAxisSize.min,
 children: [
 IconButton(
 icon: const Icon(Icons.edit),
 onPressed: () {
 // Placeholder for edit action
                            },
 ),
 IconButton(
 icon: const Icon(Icons.delete),
 onPressed: () {
 // Placeholder for delete action
                            },
 ),
                          ],
 ),
 ),
 );
                  },
 ),
 ),
            const SizedBox(height: 20),
            const Text(
 'Add New Medication',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
 TextField(
 controller: _nameController,
 decoration: const InputDecoration(labelText: 'Medicine Name'),
            ),
 TextField(
 controller: _dosageController,
 decoration: const InputDecoration(labelText: 'Dosage (e.g., 10mg)'),
            ),
 TextField(
 controller: _frequencyController,
 decoration: const InputDecoration(labelText: 'Frequency (e.g., Once daily)'),
            ),
 TextField(
 controller: _startDateController,
 decoration: const InputDecoration(labelText: 'Start Date'),
 readOnly: true, // Make it read-only to use a date picker
 onTap: () {
 // Placeholder for date picker
              },
            ),
 TextField(
 controller: _endDateController,
 decoration: const InputDecoration(labelText: 'End Date (Optional)'),
 readOnly: true, // Make it read-only to use a date picker
 onTap: () {
 // Placeholder for date picker
              },
            ),
            const SizedBox(height: 20),
 Center(
 child: ElevatedButton(
 onPressed: _addMedication,
 child: const Text('Add Medication'),
 ),
            ),
          ],
 ),
      ),
 );
  }
}
import 'package:flutter/material.dart';

class PatientMedicationScreen extends StatefulWidget {
  const PatientMedicationScreen({Key? key}) : super(key: key);

  @override
  _PatientMedicationScreenState createState() => _PatientMedicationScreenState();
}

class _PatientMedicationScreenState extends State<PatientMedicationScreen> {
  // Placeholder list for medications
  final List<Map<String, dynamic>> _medications = [
    {'name': 'Aspirin', 'dosage': '100mg', 'schedule': 'Once daily'},
    {'name': 'Lisinopril', 'dosage': '10mg', 'schedule': 'Once daily'},
  ];

  // Controllers for form fields
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _dosageController = TextEditingController();
  final TextEditingController _frequencyController = TextEditingController();
  final TextEditingController _startDateController = TextEditingController();
  final TextEditingController _endDateController = TextEditingController();

  void _addMedication() {
    // Placeholder function to add a new medication
    // In a real app, you would collect data from the form fields
    // and save it (e.g., to Firestore).
    print('Add Medication button pressed');
    // Clear form fields after adding
    _nameController.clear();
    _dosageController.clear();
    _frequencyController.clear();
    _startDateController.clear();
    _endDateController.clear();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _dosageController.dispose();
    _frequencyController.dispose();
    _startDateController.dispose();
    _endDateController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Medication Management'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'My Medications',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: _medications.length,
                itemBuilder: (context, index) {
                  final medication = _medications[index];
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    child: ListTile(
                      title: Text(medication['name']),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Dosage: ${medication['dosage']}'),
                          Text('Schedule: ${medication['schedule']}'),
                        ],
                      ),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.edit),
                            onPressed: () {
                              // Placeholder for edit action
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () {
                              // Placeholder for delete action
                            },
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              'Add New Medication',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Medicine Name'),
            ),
            TextField(
              controller: _dosageController,
              decoration: const InputDecoration(labelText: 'Dosage (e.g., 10mg)'),
            ),
            TextField(
              controller: _frequencyController,
              decoration: const InputDecoration(labelText: 'Frequency (e.g., Once daily)'),
            ),
            TextField(
              controller: _startDateController,
              decoration: const InputDecoration(labelText: 'Start Date'),
              readOnly: true, // Make it read-only to use a date picker
              onTap: () {
                // Placeholder for date picker
              },
            ),
            TextField(
              controller: _endDateController,
              decoration: const InputDecoration(labelText: 'End Date (Optional)'),
              readOnly: true, // Make it read-only to use a date picker
              onTap: () {
                // Placeholder for date picker
              },
            ),
            const SizedBox(height: 20),
            Center(
              child: ElevatedButton(
                onPressed: _addMedication,
                child: const Text('Add Medication'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}