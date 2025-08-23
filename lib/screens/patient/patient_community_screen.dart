import 'package:flutter/material.dart';

class PatientCommunityScreen extends StatefulWidget {
  const PatientCommunityScreen({Key? key}) : super(key: key);

  @override
  _PatientCommunityScreenState createState() => _PatientCommunityScreenState();
}

class _PatientCommunityScreenState extends State<PatientCommunityScreen> {
  // Placeholder data for demo groups and conversations
  final List<Map<String, dynamic>> demoGroups = [
    {
      'id': 'group_001',
      'name': 'Cardiology Experts',
      'doctors': ['Dr. Smith (ID: cardio_123)', 'Dr. Jones (ID: cardio_456)'],
      'conversation': [
        {'sender': 'Dr. Smith', 'message': 'Welcome to the cardiology group!', 'timestamp': '10:00 AM'},
        {'sender': 'Patient', 'message': 'Hi doctors, I have a question about my blood pressure.', 'timestamp': '10:05 AM'},
        {'sender': 'Dr. Jones', 'message': 'Feel free to share your query, we are here to help.', 'timestamp': '10:10 AM'},
      ],
    },
    {
      'id': 'group_002',
      'name': 'Pediatric Care',
      'doctors': ['Dr. Williams (ID: pedia_789)', 'Dr. Brown (ID: pedia_012)'],
      'conversation': [
        {'sender': 'Dr. Williams', 'message': 'Hello parents! Share your concerns about your child\'s health.', 'timestamp': 'Yesterday'},
        {'sender': 'Patient', 'message': 'My daughter has a persistent cough.', 'timestamp': 'Yesterday'},
      ],
    },
    {
      'id': 'group_003',
      'name': 'Diabetes Management',
      'doctors': ['Dr. Garcia (ID: diabe_345)'],
      'conversation': [
        {'sender': 'Dr. Garcia', 'message': 'Discuss your diabetes management strategies here.', 'timestamp': '2 days ago'},
        {'sender': 'Patient', 'message': 'What are good exercises for type 2 diabetes?', 'timestamp': '2 days ago'},
      ],
    },
  ];

  TextEditingController _searchController = TextEditingController();
  List<Map<String, dynamic>> _filteredGroups = [];

  @override
  void initState() {
    super.initState();
    _filteredGroups = demoGroups;
    _searchController.addListener(_filterGroups);
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _filterGroups() {
    final query = _searchController.text.toLowerCase();
    setState(() {
      if (query.isEmpty) {
        _filteredGroups = demoGroups;
      } else {
        _filteredGroups = demoGroups.where((group) {
          // Search by group name or doctor ID
          final groupName = group['name'].toLowerCase();
          final doctors = group['doctors'] as List<String>;
          final doctorIds = doctors.map((doc) => doc.toLowerCase()).join(' ');
          return groupName.contains(query) || doctorIds.contains(query);
        }).toList();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Community'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Search doctors by ID or group name',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
            ),
            const SizedBox(height: 16.0),
            Text(
              'Doctor Groups',
              style: Theme.of(context).textTheme.headline6,
            ),
            const SizedBox(height: 8.0),
            Expanded(
              child: ListView.builder(
                itemCount: _filteredGroups.length,
                itemBuilder: (context, index) {
                  final group = _filteredGroups[index];
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    child: ExpansionTile(
                      title: Text(group['name']),
                      subtitle: Text('${group['doctors'].length} doctors'),
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Doctors: ${group['doctors'].join(', ')}'),
                              const SizedBox(height: 8.0),
                              Text(
                                'Conversation Preview:',
                                style: Theme.of(context).textTheme.subtitle1,
                              ),
                              const SizedBox(height: 4.0),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: (group['conversation'] as List<Map<String, dynamic>>)
                                    .map((message) => Text('${message['sender']}: ${message['message']} (${message['timestamp']})'))
                                    .toList(),
                              ),
                              // Add a button to view full conversation or join group
                              Align(
                                alignment: Alignment.bottomRight,
                                child: TextButton(
                                  onPressed: () {
                                    // TODO: Implement navigation to full group chat
                                    print('View full conversation for ${group['name']}');
                                  },
                                  child: const Text('View Conversation'),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
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