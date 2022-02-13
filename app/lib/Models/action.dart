class CustomAction {
  String name;
  List config;

  CustomAction({required this.name, required this.config});
  factory CustomAction.fromJson({required dynamic json}) {
    return CustomAction(
        name: json['name'] ?? "Null", config: json['config'] ?? {});
  }

  @override
  String toString() {
    final Map<String, String> data = <String, String>{
      'Action Name': name,
      'Action Config': config.toString()
    };
    return data.toString();
  }

  void clean() {
    config.removeWhere((item) => item.toString() == "empty");
  }
}
