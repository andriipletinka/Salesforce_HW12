/**
 * Created by ASUS on 01.11.2023.
 */

public with sharing class NewAccountController {

    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> getRelatedOpportunities(id accountId) {
        return [
                SELECT Id, Name, StageName
                FROM Opportunity
                WHERE AccountId = :accountId
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Contact> getRelatedContacts(id accountId) {
        return [
                SELECT Id, Name, Title, Email, Phone
                FROM Contact
                WHERE AccountId = :accountId
        ];
    }
}