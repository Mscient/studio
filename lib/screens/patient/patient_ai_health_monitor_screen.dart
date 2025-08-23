import 'package:flutter/material.dart';

class PatientAIHealthMonitorScreen extends StatelessWidget {
  const PatientAIHealthMonitorScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Health Monitor'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Your Vitals',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            // Placeholder Vitals Display Cards
            _buildVitalCard(
              context,
              'Heart Rate',
              '78 bpm',
              Colors.green,
              Icons.arrow_upward, // Placeholder trend icon
            ),
            _buildVitalCard(
              context,
              'Blood Pressure',
              '122/78 mmHg',
              Colors.orange,
              Icons.arrow_downward, // Placeholder trend icon
            ),
            _buildVitalCard(
              context,
              'Blood Sugar',
              '96 mg/dL',
              Colors.green,
              Icons.remove, // Placeholder trend icon
            ),
            _buildVitalCard(
              context,
              'Temperature',
              '37.1 °C',
              Colors.green,
              Icons.remove, // Placeholder trend icon
            ),
            const SizedBox(height: 24),
            // Placeholder Symptom Checker Button
            ElevatedButton(
              onPressed: () {
                // TODO: Implement Symptom Checker Bot
              },
              child: const Text('Symptom Checker'),
            ),
            const SizedBox(height: 24),
            // Placeholder Alert Box
            Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Colors.red[100],
                borderRadius: BorderRadius.circular(8.0),
                border: Border.all(color: Colors.red),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.warning, color: Colors.red),
                      SizedBox(width: 8),
                      Text(
                        'Alert!',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.red,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Your sugar is above safe range. Please consult your doctor.',
                    style: TextStyle(fontSize: 14),
                  ),
                  const SizedBox(height: 16),
                  Align(
                    alignment: Alignment.bottomRight,
                    child: ElevatedButton(
                      onPressed: () {
                        // TODO: Implement Notify Doctor action
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.red,
                        foregroundColor: Colors.white,
                      ),
                      child: const Text('Notify Doctor'),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildVitalCard(BuildContext context, String title, String value,
      Color indicatorColor, IconData trendIcon) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                      fontSize: 16, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text(
                  value,
                  style: const TextStyle(fontSize: 20),
                ),
              ],
            ),
            Row(
              children: [
                Icon(
                  trendIcon,
                  color: indicatorColor,
                ),
                const SizedBox(width: 8),
                Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: indicatorColor,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}