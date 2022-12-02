import interactions 
from urllib.request import urlopen, Request
import json

token = "" #Token de votre bot discord
id_server = 0 #ID de votre serveur 

bot = interactions.Client(token="MTA0ODA2MTkyODM3MjcwNzQxOA.G4mXMo.S1jKRKK0QHH9fMJ3vkO_1B4M_FdI5mlFMYgqLg",
                          default_scope = 1048063265219035138)

#URL vers la BD de notre site web
url_recup = "https://publicedge.ml/night-info/get_Couleurs.php"
url_envoi = "https://publicedge.ml/night-info/put_css_property.php?color="


@bot.command(
    name="change_couleur",
    description="change la couleur d'un bouton du site web",
    options = [
        interactions.Option(
            name="couleur",
            description="Quelle couleur voulez-vous ?",
            type=interactions.OptionType.STRING,
            required=True,
        ),
    ],
)



async def change_de_couleur(ctx: interactions.CommandContext, couleur: str):
    liste_couleur = requet_php_coul(url_recup)

    if verif_couleur(liste_couleur, couleur):
        envoie_couleur(url_envoi, couleur)
        await ctx.send(f"Couleur du site changé pour '{couleur}'")
    else:
        await ctx.send(f"La couleur {couleur} n'est pas recconue, essayez une couleur parmis les suivantes {liste_couleur}")


def envoie_couleur(url, couleur):
    url += couleur
    r = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    urlopen(r)



def requet_php_coul(url):

    # store the response of URL
    r = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urlopen(r)

    # storing the JSON response 
    # from url in data
    data_json = json.loads(response.read())

    return data_json

def verif_couleur(liste_coul, couleur):
    return (couleur in liste_coul)

bot.start()