import 'package:flutter/material.dart';

class PatientHealthRecordsScreen extends StatefulWidget {
  const PatientHealthRecordsScreen({Key? key}) : super(key: key);

  @override
  _PatientHealthRecordsScreenState createState() => _PatientHealthRecordsScreenState();
}

class _PatientHealthRecordsScreenState extends State<PatientHealthRecordsScreen> {
  // Placeholder list of health records
  final List<Map<String, String>> _records = [
    {
      'fileType': 'PDF',
      'uploadDate': '2023-10-27',
      'tags': 'Blood Test',
    },
    {
      'fileType': 'Image',
      'uploadDate': '2023-10-20',
      'tags': 'X-ray',
    },
    {
      'fileType': 'PDF',
      'uploadDate': '2023-10-15',
      'tags': 'MRI',
    },
  ];

  void _uploadRecord() {
    // TODO: Implement record upload logic
    print('Upload Record button pressed');
  }

  void _viewRecord(int index) {
    // TODO: Implement view record logic
    print('View Record button pressed for index: $index');
  }

  void _deleteRecord(int index) {
    // TODO: Implement delete record logic with confirmation modal
    print('Delete Record button pressed for index: $index');
    // Example of a simple confirmation dialog (replace with a proper modal)
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Confirm Delete'),
          content: Text('Are you sure you want to delete this record?'),
          actions: <Widget>[
            TextButton(
              child: Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Delete'),
              onPressed: () {
                setState(() {
                  _records.removeAt(index);
                });
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Health Records'),
      ),
      body: ListView.builder(
        itemCount: _records.length,
        itemBuilder: (context, index) {
          final record = _records[index];
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('File Type: ${record['fileType']}'),
                  const SizedBox(height: 4.0),
                  Text('Upload Date: ${record['uploadDate']}'),
                  const SizedBox(height: 4.0),
                  Text('Tags: ${record['tags']}'),
                  const SizedBox(height: 8.0),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () => _viewRecord(index),
                        child: const Text('View'),
                      ),
                      const SizedBox(width: 8.0),
                      TextButton(
                        onPressed: () => _deleteRecord(index),
                        style: TextButton.styleFrom(primary: Colors.red),
                        child: const Text('Delete'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _uploadRecord,
        tooltip: 'Upload Record',
        child: const Icon(Icons.add),
      ),
    );
  }
}