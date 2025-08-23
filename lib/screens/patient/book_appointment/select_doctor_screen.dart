import 'package:flutter/material.dart';

class SelectDoctorScreen extends StatefulWidget {
  @override
  _SelectDoctorScreenState createState() => _SelectDoctorScreenState();
}

class _SelectDoctorScreenState extends State<SelectDoctorScreen> {
  // Placeholder list of doctors
  final List<Map<String, String>> doctors = [
    {
      'name': 'Dr. John Smith',
      'specialty': 'Cardiologist',
      'hospital': 'City General Hospital',
      'fees': '\$50',
    },
    {
      'name': 'Dr. Emily Johnson',
      'specialty': 'Pediatrician',
      'hospital': 'Children\'s Clinic',
      'fees': '\$40',
    },
    {
      'name': 'Dr. Michael Williams',
      'specialty': 'Dermatologist',
      'hospital': 'Skin & Allergy Center',
      'fees': '\$60',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Select Doctor'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Search doctor or specialty',
                      prefixIcon: Icon(Icons.search),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8.0),
                        borderSide: BorderSide.none,
                      ),
                      filled: true,
                      fillColor: Colors.grey[200],
                    ),
                  ),
                ),
                SizedBox(width: 8.0),
                IconButton(
                  icon: Icon(Icons.filter_list),
                  onPressed: () {
                    // TODO: Implement filter functionality
                  },
                ),
              ],
            ),
            SizedBox(height: 16.0),
            Expanded(
              child: ListView.builder(
                itemCount: doctors.length,
                itemBuilder: (context, index) {
                  final doctor = doctors[index];
                  return Card(
                    margin: EdgeInsets.symmetric(vertical: 8.0),
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            doctor['name']!,
                            style: TextStyle(
                              fontSize: 18.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 4.0),
                          Text(doctor['specialty']!),
                          SizedBox(height: 4.0),
                          Text(doctor['hospital']!),
                          SizedBox(height: 8.0),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Fees: ${doctor['fees']!}',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: Theme.of(context).primaryColor,
                                ),
                              ),
                              ElevatedButton(
                                onPressed: () {
                                  // TODO: Implement navigate to select date/time
                                  print('Book ${doctor['name']}');
                                },
                                child: Text('Book'),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}