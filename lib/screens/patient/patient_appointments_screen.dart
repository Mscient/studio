import 'package:flutter/material.dart';

class PatientAppointmentsScreen extends StatefulWidget {
  const PatientAppointmentsScreen({Key? key}) : super(key: key);

  @override
  _PatientAppointmentsScreenState createState() => _PatientAppointmentsScreenState();
}

class _PatientAppointmentsScreenState extends State<PatientAppointmentsScreen> {
  int _selectedIndex = 0; // 0 for Upcoming, 1 for Past

  // Placeholder data for appointments
  final List<Map<String, dynamic>> _upcomingAppointments = [
    {
      'doctorName': 'Dr. Emily Carter',
      'specialty': 'Cardiologist',
      'dateTime': '2023-10-27 10:00 AM',
      'status': 'Confirmed',
      'consultationType': 'online',
    },
    {
      'doctorName': 'Dr. John Smith',
      'specialty': 'Pediatrician',
      'dateTime': '2023-10-28 02:30 PM',
      'status': 'Pending',
      'consultationType': 'offline',
    },
  ];

  final List<Map<String, dynamic>> _pastAppointments = [
    {
      'doctorName': 'Dr. Jane Doe',
      'specialty': 'General Physician',
      'dateTime': '2023-10-20 11:00 AM',
      'status': 'Completed',
      'outcome': 'Follow-up in 2 weeks',
    },
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void _bookAppointment() {
    // Placeholder action for booking appointment
    print('Navigate to Book Appointment flow');
  }

  void _joinCall(String appointmentId) {
    // Placeholder action for joining call
    print('Joining call for appointment: $appointmentId');
  }

  void _cancelAppointment(String appointmentId) {
    // Placeholder action for cancelling appointment
    print('Cancelling appointment: $appointmentId');
    // Implement confirmation modal here
  }

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> currentAppointments =
        _selectedIndex == 0 ? _upcomingAppointments : _pastAppointments;

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Appointments'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: _bookAppointment,
            tooltip: 'Book Appointment',
          ),
        ],
      ),
      body: Column(
        children: [
          BottomNavigationBar(
            items: const <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                icon: Icon(Icons.calendar_today),
                label: 'Upcoming',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.history),
                label: 'Past',
              ),
            ],
            currentIndex: _selectedIndex,
            selectedItemColor: Colors.blue,
            onTap: _onItemTapped,
          ),
          Expanded(
            child: ListView.builder(
              itemCount: currentAppointments.length,
              itemBuilder: (context, index) {
                final appointment = currentAppointments[index];
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          appointment['doctorName'],
                          style: const TextStyle(
                            fontSize: 18.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4.0),
                        Text(appointment['specialty']),
                        const SizedBox(height: 4.0),
                        Text('Date & Time: ${appointment['dateTime']}'),
                        const SizedBox(height: 4.0),
                        Row(
                          children: [
                            Text('Status: '),
                            Chip(
                              label: Text(appointment['status']),
                              backgroundColor: appointment['status'] == 'Confirmed'
                                  ? Colors.green[100]
                                  : (appointment['status'] == 'Pending'
                                      ? Colors.orange[100]
                                      : Colors.red[100]),
                              labelStyle: TextStyle(
                                color: appointment['status'] == 'Confirmed'
                                    ? Colors.green[900]
                                    : (appointment['status'] == 'Pending'
                                        ? Colors.orange[900]
                                        : Colors.red[900]),
                              ),
                            ),
                          ],
                        ),
                        if (_selectedIndex == 0 && appointment['consultationType'] == 'online') ...[
                          const SizedBox(height: 12.0),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              ElevatedButton.icon(
                                onPressed: () => _joinCall(appointment['appointment_id'] ?? 'N/A'),
                                icon: const Icon(Icons.video_call),
                                label: const Text('Join Call'),
                              ),
                              const SizedBox(width: 8.0),
                              OutlinedButton(
                                onPressed: () => _cancelAppointment(appointment['appointment_id'] ?? 'N/A'),
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: Colors.red,
                                  side: const BorderSide(color: Colors.red),
                                ),
                                child: const Text('Cancel'),
                              ),
                            ],
                          ),
                        ],
                        if (_selectedIndex == 1 && appointment['outcome'] != null) ...[
                           const SizedBox(height: 8.0),
                           Text('Outcome: ${appointment['outcome']}'),
                        ],
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}