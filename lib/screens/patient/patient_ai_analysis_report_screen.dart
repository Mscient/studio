import 'package:flutter/material.dart';

class PatientAiAnalysisReportScreen extends StatelessWidget {
  const PatientAiAnalysisReportScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Analysis Report'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Detailed Analysis Report',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16.0),
            Card(
              elevation: 2.0,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Summary',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'This section provides a brief overview of the AI analysis findings. [Placeholder: Insert AI-generated summary here.]',
                      style: TextStyle(fontSize: 16.0),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16.0),
            Card(
              elevation: 2.0,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Key Findings',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'Detailed points highlighted by the AI analysis. [Placeholder: List key findings here.]',
                      style: TextStyle(fontSize: 16.0),
                    ),
                    // Example finding
                    const ListTile(
                      leading: Icon(Icons.medical_services_outlined),
                      title: Text('Potential trend in blood pressure'),
                      subtitle: Text('Analysis indicates a slight upward trend based on recent readings.'),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16.0),
            Card(
              elevation: 2.0,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Data Used in Analysis',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'This analysis considered the following data points:',
                      style: TextStyle(fontSize: 16.0),
                    ),
                    const SizedBox(height: 8.0),
                    const Text('- Recent Vitals (BP, HR, Temp)'),
                    const Text('- Medication Adherence History'),
                    const Text('- Latest Lab Results'),
                    const Text('- Previous Appointment Notes'),
                    const Text('- Medical History'),
                    // [Placeholder: List specific data points with dates/values]
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16.0),
            Card(
              elevation: 2.0,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Potential Insights',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'These are potential insights based on the AI analysis. Always consult a healthcare professional for diagnosis and treatment.',
                      style: TextStyle(fontSize: 16.0),
                    ),
                    // Example insight
                    const ListTile(
                      leading: Icon(Icons.info_outline),
                      title: Text('Consider reviewing medication dosage'),
                      subtitle: Text('Based on adherence and recent vitals, a dosage review might be beneficial.'),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24.0),
            Text(
              'Important Note:',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.red),
            ),
            const SizedBox(height: 8.0),
            const Text(
              'This report is generated by an AI model and is for informational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.',
              style: TextStyle(fontSize: 14.0, fontStyle: FontStyle.italic),
            ),
          ],
        ),
      ),
    );
  }
}
import 'package:flutter/material.dart';

class PatientAiAnalysisReportScreen extends StatelessWidget {
  const PatientAiAnalysisReportScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Analysis Report'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Detailed Analysis Report',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16.0),
            Card(
              elevation: 2.0,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Summary',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'This section provides a brief overview of the AI analysis findings. [Placeholder: Insert AI-generated summary here.]',
                      style: TextStyle(fontSize: 16.0),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16.0),
            Card(
              elevation: 2.0,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Key Findings',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'Detailed points highlighted by the AI analysis. [Placeholder: List key findings here.]',
                      style: TextStyle(fontSize: 16.0),
                    ),
                    // Example finding
                    const ListTile(
                      leading: Icon(Icons.medical_services_outlined),
                      title: Text('Potential trend in blood pressure'),
                      subtitle: Text('Analysis indicates a slight upward trend based on recent readings.'),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16.0),
            Card(
              elevation: 2.0,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Data Used in Analysis',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'This analysis considered the following data points:',
                      style: TextStyle(fontSize: 16.0),
                    ),
                    const SizedBox(height: 8.0),
                    const Text('- Recent Vitals (BP, HR, Temp)'),
                    const Text('- Medication Adherence History'),
                    const Text('- Latest Lab Results'),
                    const Text('- Previous Appointment Notes'),
                    const Text('- Medical History'),
                    // [Placeholder: List specific data points with dates/values]
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16.0),
            Card(
              elevation: 2.0,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Potential Insights',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'These are potential insights based on the AI analysis. Always consult a healthcare professional for diagnosis and treatment.',
                      style: TextStyle(fontSize: 16.0),
                    ),
                    // Example insight
                    const ListTile(
                      leading: Icon(Icons.info_outline),
                      title: Text('Consider reviewing medication dosage'),
                      subtitle: Text('Based on adherence and recent vitals, a dosage review might be beneficial.'),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24.0),
            Text(
              'Important Note:',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.red),
            ),
            const SizedBox(height: 8.0),
            const Text(
              'This report is generated by an AI model and is for informational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.',
              style: TextStyle(fontSize: 14.0, fontStyle: FontStyle.italic),
            ),
          ],
        ),
      ),
    );
  }
}