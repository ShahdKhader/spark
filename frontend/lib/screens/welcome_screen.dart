import 'package:flutter/material.dart';
import 'package:untitled/screens/signin_screen.dart';
import 'package:untitled/screens/signup_screen.dart';
import 'package:untitled/theme/theme.dart';
import 'package:untitled/widgets/custom_scaffold.dart';
import 'package:untitled/widgets/welcome_button.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween, // Added this line
        children: [
          // Text Content at the Top
          Padding(
            padding: const EdgeInsets.only(
              top: 0.0, // Adjust this value to move the text higher
              left: 40.0,
              right: 40.0,
            ),
            child: Center(
              child: RichText(
                textAlign: TextAlign.center,
                text: const TextSpan(
                  children: [
                    TextSpan(
                      text: '\n\nBrain Box!\n',
                      style: TextStyle(
                        fontSize: 42.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.white, // Text color matches background visibility
                        shadows: [
                          Shadow(
                            blurRadius: 10.0,
                            color: Colors.black45, // Add shadow for better readability
                            offset: Offset(2.0, 2.0),
                          ),
                        ],
                      ),
                    ),
                    TextSpan(
                      text:
                      '\nWelcome back! Hi to our project, we love you all\n',
                      style: TextStyle(
                        fontSize: 18.0,
                        color: Colors.black, // Softer color for secondary text
                        shadows: [
                          Shadow(
                            blurRadius: 8.0,
                            color: Colors.white70,
                            offset: Offset(1.0, 1.0),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          // Buttons at the Bottom
          Row(
            children: [
              Expanded(
                child: WelcomeButton(
                  buttonText: 'Sign in',
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const SigninScreen(),
                      ),
                    );
                  },
                  color: Colors.transparent,
                  textColor: Colors.white,
                ),
              ),
              Expanded(
                child: WelcomeButton(
                  buttonText: 'Sign up',
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const SignUpScreen(),
                      ),
                    );
                  },
                  color: Colors.white,
                  textColor: lightColorScheme.primary,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
