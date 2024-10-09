import 'package:flutter/material.dart';

class EditProfilePage extends StatefulWidget {
  final String userName;
  final String bio;
  final List<String> skills;
  final String profilePicture;

  // Constructor with required types for the parameters
  EditProfilePage({
    Key? key, // Use 'Key?' for null safety
    required this.userName,
    required this.bio,
    required this.skills,
    required this.profilePicture,
  }) : super(key: key); // Pass the key to the superclass

  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  late TextEditingController _nameController; // Use 'late' for non-nullable
  late TextEditingController _bioController; // Use 'late' for non-nullable
  late List<TextEditingController> _skillControllers; // Use 'late' for non-nullable

  @override
  void initState() {
    super.initState();
    // Initialize the controllers
    _nameController = TextEditingController(text: widget.userName);
    _bioController = TextEditingController(text: widget.bio);
    _skillControllers = widget.skills
        .map((skill) => TextEditingController(text: skill))
        .toList();
  }

  @override
  void dispose() {
    // Dispose the controllers to free up resources
    _nameController.dispose();
    _bioController.dispose();
    for (var controller in _skillControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Edit Profile"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Edit Profile",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 20),
              TextField(
                controller: _nameController,
                decoration: InputDecoration(labelText: "Name"),
              ),
              SizedBox(height: 20),
              TextField(
                controller: _bioController,
                decoration: InputDecoration(labelText: "Bio"),
                maxLines: 3,
              ),
              SizedBox(height: 20),
              Text("Skills"),
              SizedBox(height: 10),
              Column(
                children: _skillControllers.map((controller) {
                  return TextField(
                    controller: controller,
                    decoration: InputDecoration(labelText: "Skill"),
                  );
                }).toList(),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  List<String> updatedSkills = _skillControllers.map((controller) => controller.text).toList();
                  Navigator.pop(context, {
                    'name': _nameController.text,
                    'bio': _bioController.text,
                    'skills': updatedSkills,
                  });
                },
                child: Text("Save"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
