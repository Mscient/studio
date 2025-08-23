import 'package:flutter/material.dart';
import 'package:your_app_name/screens/patient/patient_community_screen.dart'; // Assuming your app name is 'your_app_name'
import 'package:your_app_name/screens/patient/patient_medication_screen.dart'; // Assuming your app name is 'your_app_name'

class PatientDashboardScreen extends StatefulWidget {
  const PatientDashboardScreen({Key? key}) : super(key: key);

  @override
  _PatientDashboardScreenState createState() => _PatientDashboardScreenState();
}

class _PatientDashboardScreenState extends State<PatientDashboardScreen> {
  // Placeholder state for selected tab
 int _selectedIndex = 0;

  static const List<Widget> _widgetOptions = <Widget>[
    // Placeholder widgets for each section
    Text('Appointments Section (Placeholder)'),
    Text('Prescriptions Section (Placeholder)'),
    Text('Health Records Section (Placeholder)'),
    // Use a placeholder for AI Monitor for now
    Text('AI Health Monitor Section (Placeholder)'),
    PatientCommunityScreen(), // Display the Community screen
    Text('Payments Section (Placeholder)'),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    // TODO: Implement navigation to different sections
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Hello, Samarth 👋'), // Placeholder greeting
            CircleAvatar(
              // Placeholder for profile picture
              backgroundColor: Colors.blue,
              child: Icon(Icons.person, color: Colors.white),
            ),
          ],
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
 Flexible( // Wrap with Flexible or Expanded to prevent overflow
 child: ListView( // Use ListView for scrolling
 children: <Widget>[
 // Quick Actions (Placeholder)
 Text(
 'Quick Actions',
 style: TextStyle(
 fontSize: 18.0,
 fontWeight: FontWeight.bold,
 ),
            ),
 const SizedBox(height: 12.0),
 Row(
 mainAxisAlignment: MainAxisAlignment.spaceAround,
 children: <Widget>[
 ElevatedButton.icon(
 onPressed: () {
 // TODO: Implement navigation to Book Appointment
 },
 icon: const Icon(Icons.calendar_month),
 label: const Text('Book New Appointment'),
 ),
 ElevatedButton.icon(
 onPressed: () {
 // TODO: Implement upload report functionality
 },
 icon: const Icon(Icons.upload_file),
 label: const Text('Upload Report'),
 ),
 ],
 ),
 const SizedBox(height: 24.0),

 // AI Insight Box (Placeholder)
 Container(
 padding: const EdgeInsets.all(16.0),
 decoration: BoxDecoration(
 color: Colors.yellow[100], // Placeholder color
 borderRadius: BorderRadius.circular(8.0),
 border: Border.all(color: Colors.yellow!),
 ),
 child: Row(
 children: <Widget>[
 Icon(Icons.warning, color: Colors.orange), // Placeholder icon
 const SizedBox(width: 8.0),
 Expanded(
 child: Text(
 'Your BP is slightly high today.', // Placeholder message
 style: TextStyle(color: Colors.orange[900]),
 ),
 ),
 ],
 ),
 ),
 const SizedBox(height: 24.0),

          // Upcoming Medications Section
 GestureDetector( // Make the entire section tappable
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const PatientMedicationScreen()), // Navigate to Medication Screen
              );
            },
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                const Text(
                  'Upcoming Medications',
                  style: TextStyle(
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                  ),
 ),
                const SizedBox(height: 12.0),
                // Placeholder list for upcoming medications
                SizedBox(
                  height: 100.0, // Placeholder height
                  child: ListView.builder(
                    itemCount: 3, // Demo count
                    itemBuilder: (BuildContext context, int index) {
 return ListTile(
 leading: const Icon(Icons.medical_services),
 title: Text('Medicine Name ${index + 1}'),
 subtitle: Text('Time: ${10 + index}:00 AM'),
 );
 },


                  },
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24.0),
 ],
 ),
 ),

          // The main content area that switches based on the selected tab (Expanded to fill available space)
          Expanded(
            child: Container(
              alignment: Alignment.center,
              child: _widgetOptions.elementAt(_selectedIndex),
            ),
          ),
        ),
      ),
      // BottomNavigationBar for main navigation sections
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: 'Appointments'),
          BottomNavigationBarItem(icon: Icon(Icons.medical_services), label: 'Prescriptions'),
          BottomNavigationBarItem(icon: Icon(Icons.folder), label: 'Records'),
          BottomNavigationBarItem(icon: Icon(Icons.monitor_heart), label: 'AI Monitor'), // Updated icon to match section
          BottomNavigationBarItem(icon: Icon(Icons.group), label: 'Community'), // Added Community label
          BottomNavigationBarItem(icon: Icon(Icons.payments), label: 'Payments'), // Updated icon to match section
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blue,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed, // Ensures all items are visible
      ),    );
  }
}