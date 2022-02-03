class Reaction {
  final String name;
  final dynamic config;

  Reaction({required this.name, required this.config});
  factory Reaction.fromJson({required dynamic json}) {
    return Reaction(name: json['name'], config: json['config']);
  }

  @override
  String toString() {
    final Map<String, String> data = <String, String>{
      'Action Name': name,
      'Action Config': config.toString()
    };
    return data.toString();
  }
}
